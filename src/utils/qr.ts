const QR_VERSION = 2
const QR_SIZE = QR_VERSION * 4 + 17
const DATA_CODEWORDS = 34
const EC_CODEWORDS = 10
const FORMAT_GENERATOR = 0x537
const FORMAT_MASK = 0x5412

const EXP_TABLE = new Uint8Array(512)
const LOG_TABLE = new Uint8Array(256)

let value = 1
for (let index = 0; index < 255; index += 1) {
  EXP_TABLE[index] = value
  LOG_TABLE[value] = index
  value <<= 1

  if (value & 0x100) {
    value ^= 0x11d
  }
}

for (let index = 255; index < 512; index += 1) {
  EXP_TABLE[index] = EXP_TABLE[index - 255]
}

function multiplyGF(left: number, right: number): number {
  if (left === 0 || right === 0) {
    return 0
  }

  return EXP_TABLE[LOG_TABLE[left] + LOG_TABLE[right]]
}

function getGeneratorPolynomial(degree: number): number[] {
  let polynomial = [1]

  for (let index = 0; index < degree; index += 1) {
    const next = new Array(polynomial.length + 1).fill(0)

    for (let polyIndex = 0; polyIndex < polynomial.length; polyIndex += 1) {
      next[polyIndex] ^= polynomial[polyIndex]
      next[polyIndex + 1] ^= multiplyGF(polynomial[polyIndex], EXP_TABLE[index])
    }

    polynomial = next
  }

  return polynomial
}

function getErrorCorrectionBytes(data: number[]): number[] {
  const generator = getGeneratorPolynomial(EC_CODEWORDS)
  const buffer = [...data, ...new Array(EC_CODEWORDS).fill(0)]

  for (let index = 0; index < data.length; index += 1) {
    const factor = buffer[index]

    if (factor === 0) {
      continue
    }

    for (let generatorIndex = 0; generatorIndex < generator.length; generatorIndex += 1) {
      buffer[index + generatorIndex] ^= multiplyGF(generator[generatorIndex], factor)
    }
  }

  return buffer.slice(data.length)
}

function getBchDigit(data: number): number {
  let digit = 0
  let current = data

  while (current !== 0) {
    digit += 1
    current >>>= 1
  }

  return digit
}

function getFormatBits(mask: number): number {
  const format = (1 << 3) | mask
  let value = format << 10

  while (getBchDigit(value) - getBchDigit(FORMAT_GENERATOR) >= 0) {
    value ^= FORMAT_GENERATOR << (getBchDigit(value) - getBchDigit(FORMAT_GENERATOR))
  }

  return ((format << 10) | value) ^ FORMAT_MASK
}

function encodeData(payload: string): number[] {
  const bytes = Array.from(new TextEncoder().encode(payload))

  if (bytes.length > 32) {
    throw new Error('QR payload is too long for the current version')
  }

  const bits: number[] = []
  const pushBits = (value: number, length: number) => {
    for (let shift = length - 1; shift >= 0; shift -= 1) {
      bits.push((value >>> shift) & 1)
    }
  }

  pushBits(0b0100, 4)
  pushBits(bytes.length, 8)
  bytes.forEach((byte) => pushBits(byte, 8))

  const maxBits = DATA_CODEWORDS * 8
  const terminatorLength = Math.min(4, maxBits - bits.length)
  pushBits(0, terminatorLength)

  while (bits.length % 8 !== 0) {
    bits.push(0)
  }

  const dataCodewords: number[] = []
  for (let bitIndex = 0; bitIndex < bits.length; bitIndex += 8) {
    let codeword = 0

    for (let offset = 0; offset < 8; offset += 1) {
      codeword = (codeword << 1) | bits[bitIndex + offset]
    }

    dataCodewords.push(codeword)
  }

  const padBytes = [0xec, 0x11]
  while (dataCodewords.length < DATA_CODEWORDS) {
    dataCodewords.push(padBytes[dataCodewords.length % 2])
  }

  return [...dataCodewords, ...getErrorCorrectionBytes(dataCodewords)]
}

function createMatrix(): Array<Array<boolean | null>> {
  return Array.from({ length: QR_SIZE }, () => Array<boolean | null>(QR_SIZE).fill(null))
}

function createReservedMap(): boolean[][] {
  return Array.from({ length: QR_SIZE }, () => Array<boolean>(QR_SIZE).fill(false))
}

function setFunctionModule(
  matrix: Array<Array<boolean | null>>,
  reserved: boolean[][],
  row: number,
  column: number,
  value: boolean,
) {
  matrix[row][column] = value
  reserved[row][column] = true
}

function addFinderPattern(
  matrix: Array<Array<boolean | null>>,
  reserved: boolean[][],
  top: number,
  left: number,
) {
  for (let rowOffset = -1; rowOffset <= 7; rowOffset += 1) {
    const row = top + rowOffset
    if (row < 0 || row >= QR_SIZE) {
      continue
    }

    for (let columnOffset = -1; columnOffset <= 7; columnOffset += 1) {
      const column = left + columnOffset
      if (column < 0 || column >= QR_SIZE) {
        continue
      }

      const isSeparator = rowOffset === -1 || rowOffset === 7 || columnOffset === -1 || columnOffset === 7
      const isOuterRing = rowOffset === 0 || rowOffset === 6 || columnOffset === 0 || columnOffset === 6
      const isCenter = rowOffset >= 2 && rowOffset <= 4 && columnOffset >= 2 && columnOffset <= 4

      setFunctionModule(matrix, reserved, row, column, !isSeparator && (isOuterRing || isCenter))
    }
  }
}

function addAlignmentPattern(
  matrix: Array<Array<boolean | null>>,
  reserved: boolean[][],
  centerRow: number,
  centerColumn: number,
) {
  for (let rowOffset = -2; rowOffset <= 2; rowOffset += 1) {
    for (let columnOffset = -2; columnOffset <= 2; columnOffset += 1) {
      const row = centerRow + rowOffset
      const column = centerColumn + columnOffset

      if (reserved[row][column]) {
        continue
      }

      const distance = Math.max(Math.abs(rowOffset), Math.abs(columnOffset))
      setFunctionModule(matrix, reserved, row, column, distance !== 1)
    }
  }
}

function reserveFormatAreas(matrix: Array<Array<boolean | null>>, reserved: boolean[][]) {
  for (let index = 0; index < 15; index += 1) {
    if (index < 6) {
      setFunctionModule(matrix, reserved, index, 8, false)
    } else if (index < 8) {
      setFunctionModule(matrix, reserved, index + 1, 8, false)
    } else {
      setFunctionModule(matrix, reserved, QR_SIZE - 15 + index, 8, false)
    }

    if (index < 8) {
      setFunctionModule(matrix, reserved, 8, QR_SIZE - index - 1, false)
    } else if (index < 9) {
      setFunctionModule(matrix, reserved, 8, 15 - index, false)
    } else {
      setFunctionModule(matrix, reserved, 8, 15 - index - 1, false)
    }
  }
}

function applyFormatInfo(matrix: Array<Array<boolean | null>>, mask: number) {
  const formatBits = getFormatBits(mask)

  for (let index = 0; index < 15; index += 1) {
    const bit = ((formatBits >>> index) & 1) === 1

    if (index < 6) {
      matrix[index][8] = bit
    } else if (index < 8) {
      matrix[index + 1][8] = bit
    } else {
      matrix[QR_SIZE - 15 + index][8] = bit
    }

    if (index < 8) {
      matrix[8][QR_SIZE - index - 1] = bit
    } else if (index < 9) {
      matrix[8][15 - index] = bit
    } else {
      matrix[8][15 - index - 1] = bit
    }
  }

  matrix[QR_SIZE - 8][8] = true
}

function applyData(
  matrix: Array<Array<boolean | null>>,
  reserved: boolean[][],
  codewords: number[],
  mask: number,
) {
  const bits = codewords.flatMap((codeword) =>
    Array.from({ length: 8 }, (_, offset) => (codeword >>> (7 - offset)) & 1),
  )

  let bitIndex = 0
  let direction = -1

  for (let column = QR_SIZE - 1; column > 0; column -= 2) {
    if (column === 6) {
      column -= 1
    }

    for (let rowIndex = 0; rowIndex < QR_SIZE; rowIndex += 1) {
      const row = direction === -1 ? QR_SIZE - 1 - rowIndex : rowIndex

      for (let offset = 0; offset < 2; offset += 1) {
        const currentColumn = column - offset

        if (reserved[row][currentColumn]) {
          continue
        }

        const bit = bitIndex < bits.length ? bits[bitIndex] === 1 : false
        bitIndex += 1

        const masked = mask === 0 && (row + currentColumn) % 2 === 0 ? !bit : bit
        matrix[row][currentColumn] = masked
      }
    }

    direction *= -1
  }
}

export function createQrMatrix(payload: string): boolean[][] {
  const matrix = createMatrix()
  const reserved = createReservedMap()

  addFinderPattern(matrix, reserved, 0, 0)
  addFinderPattern(matrix, reserved, 0, QR_SIZE - 7)
  addFinderPattern(matrix, reserved, QR_SIZE - 7, 0)

  addAlignmentPattern(matrix, reserved, 18, 18)

  for (let index = 8; index < QR_SIZE - 8; index += 1) {
    if (!reserved[index][6]) {
      setFunctionModule(matrix, reserved, index, 6, index % 2 === 0)
    }

    if (!reserved[6][index]) {
      setFunctionModule(matrix, reserved, 6, index, index % 2 === 0)
    }
  }

  setFunctionModule(matrix, reserved, QR_SIZE - 8, 8, true)
  reserveFormatAreas(matrix, reserved)
  applyData(matrix, reserved, encodeData(payload), 0)
  applyFormatInfo(matrix, 0)

  return matrix.map((row) => row.map((cell) => cell ?? false))
}

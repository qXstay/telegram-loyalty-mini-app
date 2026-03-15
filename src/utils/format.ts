export function formatCoins(value: number): string {
  return new Intl.NumberFormat('ru-RU').format(value)
}

function pluralize(value: number, one: string, few: string, many: string): string {
  const remainder10 = value % 10
  const remainder100 = value % 100

  if (remainder10 === 1 && remainder100 !== 11) {
    return one
  }

  if (remainder10 >= 2 && remainder10 <= 4 && (remainder100 < 12 || remainder100 > 14)) {
    return few
  }

  return many
}

export function formatPoints(value: number): string {
  return `${formatCoins(value)} ${pluralize(value, 'балл', 'балла', 'баллов')}`
}

export function formatTaskStatus(value: 'available' | 'completed' | 'claimed'): string {
  switch (value) {
    case 'available':
      return 'Доступно'
    case 'completed':
      return 'Выполнено'
    default:
      return 'Забрано'
  }
}

export function formatTaskFrequency(value: 'daily' | 'weekly'): string {
  return value === 'daily' ? 'Ежедневно' : 'Еженедельно'
}

export function formatShopCategory(value: 'food' | 'accessories' | 'style'): string {
  switch (value) {
    case 'food':
      return 'Напитки'
    case 'accessories':
      return 'Бонусы'
    default:
      return 'Мерч'
  }
}

export function formatOfferStatus(value: 'active' | 'new' | 'locked'): string {
  switch (value) {
    case 'active':
      return 'Доступно'
    case 'new':
      return 'Новое'
    default:
      return 'Скоро'
  }
}

export function getLevelFromExperience(experience: number): number {
  return Math.floor(experience / 120) + 1
}

export function getLevelProgress(experience: number): number {
  return experience % 120
}

import { useEffect, useState } from 'react'
import {
  getTelegramAppSnapshot,
  initializeTelegramWebApp,
  subscribeTelegramApp,
  type TelegramAppSnapshot,
} from '../utils/telegram'

export function useTelegramApp(): TelegramAppSnapshot {
  const [telegramContext, setTelegramContext] = useState<TelegramAppSnapshot>(() => getTelegramAppSnapshot())

  useEffect(() => {
    initializeTelegramWebApp()

    return subscribeTelegramApp(() => {
      setTelegramContext(getTelegramAppSnapshot())
    })
  }, [])

  return telegramContext
}

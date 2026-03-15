import type { TelegramEventName, TelegramWebApp } from '../types/telegram'

const FALLBACK_BACKGROUND = '#ede4d7'

export interface TelegramAppSnapshot {
  isTelegram: boolean
  platform: string
  colorScheme: 'light' | 'dark'
  firstName: string | null
  displayName: string | null
  startParam: string | null
  userId: number | null
  viewportHeight: number | null
  viewportStableHeight: number | null
  safeAreaBottom: number
  contentSafeAreaBottom: number
}

export interface TelegramLaunchConfig {
  botUsername: string
  webAppUrl: string
  startParam: string
}

const TELEGRAM_EVENTS: TelegramEventName[] = [
  'themeChanged',
  'viewportChanged',
  'safeAreaChanged',
  'contentSafeAreaChanged',
  'activated',
  'deactivated',
]

function setCssVar(name: string, value: string) {
  document.documentElement.style.setProperty(name, value)
}

function getInsetValue(value?: number): string {
  return `${value ?? 0}px`
}

export function getTelegramWebApp(): TelegramWebApp | null {
  if (typeof window === 'undefined') {
    return null
  }

  return window.Telegram?.WebApp ?? null
}

export function getTelegramDisplayName(webApp = getTelegramWebApp()): string | null {
  const user = webApp?.initDataUnsafe?.user
  if (!user) {
    return null
  }

  return [user.first_name, user.last_name].filter(Boolean).join(' ') || user.username || null
}

export function applyTelegramCssVars(webApp = getTelegramWebApp()): void {
  if (typeof document === 'undefined') {
    return
  }

  if (!webApp) {
    setCssVar('--tg-bg', FALLBACK_BACKGROUND)
    setCssVar('--tg-viewport-height', '100vh')
    setCssVar('--tg-viewport-stable-height', '100vh')
    setCssVar('--tg-safe-area-inset-bottom', '0px')
    setCssVar('--tg-content-safe-area-inset-bottom', '0px')
    return
  }

  const themeBackground = webApp.themeParams?.bg_color ?? FALLBACK_BACKGROUND
  setCssVar('--tg-bg', themeBackground)
  setCssVar('--tg-viewport-height', webApp.viewportHeight ? `${webApp.viewportHeight}px` : '100vh')
  setCssVar(
    '--tg-viewport-stable-height',
    webApp.viewportStableHeight ? `${webApp.viewportStableHeight}px` : '100vh',
  )
  setCssVar('--tg-safe-area-inset-bottom', getInsetValue(webApp.safeAreaInset?.bottom))
  setCssVar(
    '--tg-content-safe-area-inset-bottom',
    getInsetValue(webApp.contentSafeAreaInset?.bottom ?? webApp.safeAreaInset?.bottom),
  )
}

export function initializeTelegramWebApp(): TelegramWebApp | null {
  const webApp = getTelegramWebApp()

  applyTelegramCssVars(webApp)

  if (!webApp) {
    return null
  }

  webApp.ready?.()
  webApp.expand?.()
  webApp.setHeaderColor?.(FALLBACK_BACKGROUND)
  webApp.setBackgroundColor?.(FALLBACK_BACKGROUND)

  return webApp
}

export function getTelegramAppSnapshot(): TelegramAppSnapshot {
  const webApp = getTelegramWebApp()

  return {
    isTelegram: Boolean(webApp),
    platform: webApp?.platform ?? 'browser',
    colorScheme: webApp?.colorScheme ?? 'light',
    firstName: webApp?.initDataUnsafe?.user?.first_name ?? null,
    displayName: getTelegramDisplayName(webApp),
    startParam: webApp?.initDataUnsafe?.start_param ?? null,
    userId: webApp?.initDataUnsafe?.user?.id ?? null,
    viewportHeight: webApp?.viewportHeight ?? null,
    viewportStableHeight: webApp?.viewportStableHeight ?? null,
    safeAreaBottom: webApp?.safeAreaInset?.bottom ?? 0,
    contentSafeAreaBottom: webApp?.contentSafeAreaInset?.bottom ?? webApp?.safeAreaInset?.bottom ?? 0,
  }
}

export function subscribeTelegramApp(onChange: () => void): () => void {
  const webApp = getTelegramWebApp()

  if (!webApp?.onEvent || !webApp.offEvent) {
    return () => undefined
  }

  const handleUpdate = () => {
    applyTelegramCssVars(webApp)
    onChange()
  }

  TELEGRAM_EVENTS.forEach((eventName) => webApp.onEvent?.(eventName, handleUpdate))

  return () => {
    TELEGRAM_EVENTS.forEach((eventName) => webApp.offEvent?.(eventName, handleUpdate))
  }
}

export function getTelegramLaunchConfig(): TelegramLaunchConfig {
  return {
    botUsername: import.meta.env.VITE_TELEGRAM_BOT_USERNAME ?? '',
    webAppUrl: import.meta.env.VITE_TELEGRAM_WEBAPP_URL ?? '',
    startParam: import.meta.env.VITE_TELEGRAM_START_PARAM ?? 'aurora-demo',
  }
}

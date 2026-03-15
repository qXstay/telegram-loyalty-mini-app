export interface TelegramUser {
  id?: number
  first_name?: string
  last_name?: string
  username?: string
}

export interface TelegramInsets {
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export interface TelegramThemeParams {
  bg_color?: string
  text_color?: string
  hint_color?: string
  button_color?: string
  secondary_bg_color?: string
}

export interface TelegramInitData {
  user?: TelegramUser
  start_param?: string
}

export type TelegramEventName =
  | 'themeChanged'
  | 'viewportChanged'
  | 'safeAreaChanged'
  | 'contentSafeAreaChanged'
  | 'activated'
  | 'deactivated'

export interface TelegramWebApp {
  initData?: string
  initDataUnsafe?: TelegramInitData
  platform?: string
  colorScheme?: 'light' | 'dark'
  themeParams?: TelegramThemeParams
  viewportHeight?: number
  viewportStableHeight?: number
  isExpanded?: boolean
  safeAreaInset?: TelegramInsets
  contentSafeAreaInset?: TelegramInsets
  ready?: () => void
  expand?: () => void
  setHeaderColor?: (color: string) => void
  setBackgroundColor?: (color: string) => void
  onEvent?: (eventType: TelegramEventName, callback: () => void) => void
  offEvent?: (eventType: TelegramEventName, callback: () => void) => void
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp
    }
  }
}

export {}

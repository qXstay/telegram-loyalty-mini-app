/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TELEGRAM_BOT_USERNAME?: string
  readonly VITE_TELEGRAM_WEBAPP_URL?: string
  readonly VITE_TELEGRAM_START_PARAM?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

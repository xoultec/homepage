/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAILGUN_API_KEY: string
  readonly VITE_MAILGUN_DOMAIN: string
  readonly VITE_TO_EMAIL: string
  readonly VITE_DISCORD_WEBHOOK_URL: string
  readonly VITE_LEMONSQUEEZY_API_KEY: string
  readonly VITE_LEMONSQUEEZY_STORE_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
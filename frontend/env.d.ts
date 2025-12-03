/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_PORT: string,
  readonly VITE_FRONTEND_PORT : number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
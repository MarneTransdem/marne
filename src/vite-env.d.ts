/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_PLATFORM_KEY: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_GOOGLE_ADS_CONVERSION_ID?: string;
  readonly VITE_GOOGLE_ADS_QUOTE_CONVERSION_LABEL?: string;
  readonly VITE_GOOGLE_SITE_VERIFICATION?: string;
  readonly VITE_ENABLE_DEMO_LOGIN?: string;
  readonly VITE_ENABLE_ADMIN_BOOTSTRAP?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

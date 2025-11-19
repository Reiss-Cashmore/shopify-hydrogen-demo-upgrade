/// <reference types="vite/client" />
/// <reference types="@shopify/oxygen-workers-types" />

import type {HydrogenContext, HydrogenSession} from '@shopify/hydrogen';
import type {I18nLocale, Storefront} from '~/lib/type';

declare global {
  /**
   * A global `process` object is only available during build to access NODE_ENV.
   */
  const process: {env: {NODE_ENV: 'production' | 'development'}};

  /**
   * Declare expected Env parameter in fetch handler.
   */
  interface Env {
    SESSION_SECRET: string;
    PUBLIC_STOREFRONT_API_TOKEN: string;
    PRIVATE_STOREFRONT_API_TOKEN: string;
    PUBLIC_STORE_DOMAIN: string;
    PUBLIC_STOREFRONT_ID: string;
    PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID: string;
    PUBLIC_CUSTOMER_ACCOUNT_API_URL: string;
    PUBLIC_CHECKOUT_DOMAIN: string;
    SHOP_ID: string;
  }
}

type AppHydrogenContext = HydrogenContext<
  HydrogenSession,
  undefined,
  I18nLocale
>;

declare module 'react-router' {
  interface AppLoadContext extends AppHydrogenContext {
    storefront: Storefront;
  }
  interface RouterContextProvider extends AppHydrogenContext {
    storefront: Storefront;
  }
}

export {};

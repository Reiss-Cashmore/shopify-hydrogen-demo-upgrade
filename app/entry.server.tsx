import type {EntryContext} from 'react-router';
import {ServerRouter} from 'react-router';
import {isbot} from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {
  createContentSecurityPolicy,
  type HydrogenRouterContextProvider,
} from '@shopify/hydrogen';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext,
  context: HydrogenRouterContextProvider,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
    scriptSrc: [
      'self',
      'https://cdn.shopify.com',
      'https://shopify.com',
      'https://www.google-analytics.com',
      'https://www.googletagmanager.com',
      'https://unpkg.com',
      'https://cdn.jsdelivr.net', // Monaco editor
      'https://ajax.googleapis.com', // model-viewer
      'blob:', // Web workers
      "'unsafe-eval'", // Required for Monaco editor
      ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:*'] : []),
    ],
    styleSrc: [
      'self',
      "'unsafe-inline'",
      'https://cdn.shopify.com',
      'https://fonts.googleapis.com', // Google Fonts
      'https://cdn.jsdelivr.net', // Monaco styles
      ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:*'] : []),
    ],
    fontSrc: [
      'self',
      'data:', // Base64 encoded fonts
      'https://fonts.gstatic.com', // Google Fonts
      'https://cdn.jsdelivr.net', // Monaco fonts
      ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:*'] : []),
    ],
    imgSrc: [
      'self',
      'data:',
      'blob:',
      'https://cdn.shopify.com',
      ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:*'] : []),
    ],
    connectSrc: [
      'self',
      'https://*.myshopify.com',
      'blob:',
      'data:', // For model-viewer base64 GLB models
      'https://cdn.jsdelivr.net',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:*', 'ws://localhost:*'] : []),
    ],
    workerSrc: [
      'self',
      'blob:', // Web workers
      ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:*'] : []),
    ],
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <ServerRouter
        context={reactRouterContext}
        url={request.url}
        nonce={nonce}
      />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}

import {useRef, Suspense} from 'react';
import {Disclosure, Listbox} from '@headlessui/react';
import {
  type MetaArgs,
  type LoaderFunctionArgs,
} from 'react-router';
import { useLoaderData, Await } from 'react-router';
import {
  getSeoMeta,
  Money,
  ShopPayButton,
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
  getProductOptions,
  type MappedProductOptions,
} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';
import clsx from 'clsx';
import type {
  Maybe,
  ProductOptionValueSwatch,
} from '@shopify/hydrogen/storefront-api-types';

import type {MediaFragment, ProductFragment} from 'storefrontapi.generated';
import {Heading, Section, Text} from '~/components/Text';
import {Link} from '~/components/Link';
import {Button} from '~/components/Button';
import {AddToCartButton} from '~/components/AddToCartButton';
import {Skeleton} from '~/components/Skeleton';
import {ProductSwimlane} from '~/components/ProductSwimlane';
import {ProductGallery} from '~/components/ProductGallery';
import {IconCaret, IconCheck, IconClose} from '~/components/Icon';
import {ProductSpecs} from '~/components/ProductSpecs';
import {
  QualityPresetSelector,
  type QualityPreset as QualityPresetConfig,
} from '~/components/QualityPresetSelector';
import {MaterialBadge} from '~/components/MaterialBadge';
import {GridfinityCompat} from '~/components/GridfinityCompat';
import {getExcerpt} from '~/lib/utils';
import type {DimensionsMeta} from '~/lib/print';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';

export const headers = routeHeaders;

export async function loader(args: LoaderFunctionArgs) {
  const {productHandle} = args.params;
  invariant(productHandle, 'Missing productHandle param, check route filename');

  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({
  params,
  request,
  context,
}: LoaderFunctionArgs) {
  const {productHandle} = params;
  invariant(productHandle, 'Missing productHandle param, check route filename');

  const selectedOptions = getSelectedProductOptions(request);

  const [{shop, product}] = await Promise.all([
    context.storefront.query(PRODUCT_QUERY, {
      variables: {
        handle: productHandle,
        selectedOptions,
        country: context.storefront.i18n.country,
        language: context.storefront.i18n.language,
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response('product', {status: 404});
  }

  const recommended = getRecommendedProducts(context.storefront, product.id);
  const selectedVariant = product.selectedOrFirstAvailableVariant ?? {};
  const variants = getAdjacentAndFirstAvailableVariants(product);

  const seo = seoPayload.product({
    product: {...product, variants},
    selectedVariant,
    url: request.url,
  });

  return {
    product,
    variants,
    shop,
    storeDomain: shop.primaryDomain.url,
    recommended,
    seo,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData(args: LoaderFunctionArgs) {
  // Put any API calls that are not critical to be available on first page render
  // For example: product reviews, product recommendations, social feeds.

  return {};
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Product() {
  const {product, shop, recommended, variants, storeDomain} =
    useLoaderData<typeof loader>();
  const {title, vendor, descriptionHtml} = product;
  const {shippingPolicy, refundPolicy} = shop;

  // Optimistically selects a variant with given available variant information
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    variants,
  );

  // Sets the search param to the selected variant without navigation
  // only when no search params are set in the url
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  // Get the product options array
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });
  const printDetails = buildPrintDetails(product);
  const selectedQuality = getSelectedQuality(selectedVariant);
  const galleryMedia = getGalleryMedia(product);

  return (
    <>
      <Section className="px-0 md:px-8 lg:px-12">
        <div className="grid items-start md:gap-6 lg:gap-16 md:grid-cols-2 lg:grid-cols-2">
          <ProductGallery
            media={galleryMedia}
            className="w-full"
          />
          <div className="sticky md:-mb-nav md:top-nav md:-translate-y-nav md:h-screen md:pt-nav hiddenScroll md:overflow-y-scroll">
            <section className="flex flex-col w-full gap-8 p-6 md:px-4 lg:px-6">
              <div className="grid gap-2">
                <Heading as="h1" className="whitespace-normal">
                  {title}
                </Heading>
                {vendor && (
                  <Text className={'opacity-50 font-medium'}>{vendor}</Text>
                )}
              </div>
              <ProductForm
                productOptions={productOptions}
                selectedVariant={selectedVariant}
                storeDomain={storeDomain}
                printDetails={printDetails}
              />
              <ProductSpecs
                dimensions={printDetails.dimensions}
                material={printDetails.material}
                weightGrams={printDetails.weightGrams}
                gridfinityUnits={printDetails.gridfinityUnits}
                qualityPresets={printDetails.qualityPresets}
                selectedQuality={selectedQuality}
              />
              <GridfinityCompat units={printDetails.gridfinityUnits} />
              <div className="grid gap-4 py-4">
                {descriptionHtml && (
                  <ProductDetail
                    title="Product Details"
                    content={descriptionHtml}
                  />
                )}
                {shippingPolicy?.body && (
                  <ProductDetail
                    title="Shipping"
                    content={getExcerpt(shippingPolicy.body)}
                    learnMore={`/policies/${shippingPolicy.handle}`}
                  />
                )}
                {refundPolicy?.body && (
                  <ProductDetail
                    title="Returns"
                    content={getExcerpt(refundPolicy.body)}
                    learnMore={`/policies/${refundPolicy.handle}`}
                  />
                )}
              </div>
            </section>
          </div>
        </div>
      </Section>
      <Suspense fallback={<Skeleton className="h-32" />}>
        <Await
          errorElement="There was a problem loading related products"
          resolve={recommended}
        >
          {(products) => (
            <ProductSwimlane title="Related Products" products={products} />
          )}
        </Await>
      </Suspense>
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </>
  );
}

type QualityTierKey = 'standard' | 'premium';

type ProductPrintDetails = {
  material?: string;
  weightGrams?: number;
  gridfinityUnits?: string;
  dimensions?: DimensionsMeta;
  qualityPresets: Record<QualityTierKey, QualityPresetConfig>;
};

export function ProductForm({
  productOptions,
  selectedVariant,
  storeDomain,
  printDetails,
}: {
  productOptions: MappedProductOptions[];
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
  storeDomain: string;
  printDetails: ProductPrintDetails;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  const isOutOfStock = !selectedVariant?.availableForSale;

  const isOnSale =
    selectedVariant?.price?.amount &&
    selectedVariant?.compareAtPrice?.amount &&
    selectedVariant?.price?.amount < selectedVariant?.compareAtPrice?.amount;

  const {qualityPresets, material} = printDetails;

  return (
    <div className="grid gap-10">
      <div className="grid gap-4">
        {productOptions.map((option, optionIndex) => {
          const isQualityOption =
            option.name.toLowerCase() === 'quality' && qualityPresets;
          if (isQualityOption) {
            return (
              <QualityPresetSelector
                key={option.name}
                title={option.name}
                options={option.optionValues.map((value) => ({
                  name: value.name,
                  variantUriQuery: value.variantUriQuery,
                  handle: value.handle,
                  selected: Boolean(value.selected),
                  available: Boolean(value.available),
                  isDifferentProduct: value.isDifferentProduct,
                }))}
                presets={qualityPresets}
              />
            );
          }

          return (
            <div
              key={option.name}
              className="product-options flex flex-col flex-wrap mb-4 gap-y-2 last:mb-0"
            >
              <Heading as="legend" size="lead" className="min-w-[4rem]">
                {option.name}
              </Heading>
              <div className="flex flex-wrap items-baseline gap-4">
                {option.optionValues.length > 7 ? (
                  <div className="relative w-full">
                    <Listbox>
                      {({open}) => (
                        <>
                          <Listbox.Button
                            ref={closeRef}
                            className={clsx(
                              'flex items-center justify-between w-full py-3 px-4 border border-primary/30 rounded transition-colors',
                              open
                                ? 'bg-primary/5 text-primary rounded-b md:rounded-t md:rounded-b-none'
                                : 'bg-contrast text-primary',
                            )}
                          >
                            <span>
                              {
                                selectedVariant?.selectedOptions[optionIndex]
                                  .value
                              }
                            </span>
                            <IconCaret direction={open ? 'up' : 'down'} />
                          </Listbox.Button>
                          <Listbox.Options
                            className={clsx(
                              'border-primary/30 bg-contrast absolute bottom-12 z-30 grid h-48 w-full overflow-y-scroll rounded-t border px-2 py-2 transition-all duration-150 shadow-xl sm:bottom-auto md:rounded-b md:rounded-t-none md:border-t-0 md:border-b',
                              open
                                ? 'max-h-48 opacity-100'
                                : 'max-h-0 opacity-0',
                            )}
                          >
                            {option.optionValues
                              .filter((value) => value.available)
                              .map(
                                ({
                                  isDifferentProduct,
                                  name,
                                  variantUriQuery,
                                  handle,
                                  selected,
                                }) => (
                                  <Listbox.Option
                                    key={`option-${option.name}-${name}`}
                                    value={name}
                                  >
                                    <Link
                                      {...(!isDifferentProduct
                                        ? {rel: 'nofollow'}
                                        : {})}
                                      to={`/products/${handle}?${variantUriQuery}`}
                                      preventScrollReset
                                      className={clsx(
                                        'w-full p-3 transition rounded flex justify-start items-center text-left cursor-pointer border border-transparent',
                                        selected
                                          ? 'bg-primary text-contrast border-primary'
                                          : 'bg-contrast text-primary hover:border-primary/30',
                                      )}
                                      onClick={() => {
                                        if (!closeRef?.current) return;
                                        closeRef.current.click();
                                      }}
                                    >
                                      {name}
                                      {selected && (
                                        <span className="ml-2">
                                          <IconCheck />
                                        </span>
                                      )}
                                    </Link>
                                  </Listbox.Option>
                                ),
                              )}
                          </Listbox.Options>
                        </>
                      )}
                    </Listbox>
                  </div>
                ) : (
                  option.optionValues.map(
                    ({
                      isDifferentProduct,
                      name,
                      variantUriQuery,
                      handle,
                      selected,
                      available,
                      swatch,
                    }) => (
                      <Link
                        key={option.name + name}
                        {...(!isDifferentProduct ? {rel: 'nofollow'} : {})}
                        to={`/products/${handle}?${variantUriQuery}`}
                        preventScrollReset
                        prefetch="intent"
                        replace
                        className={clsx(
                          'leading-none py-2 px-4 border rounded-full cursor-pointer text-sm font-medium transition-all duration-200',
                          selected
                            ? 'bg-primary text-contrast border-primary'
                            : 'bg-contrast text-primary border-primary/20',
                          available
                            ? 'opacity-100'
                            : 'opacity-40 cursor-not-allowed',
                        )}
                      >
                        <ProductOptionSwatch swatch={swatch} name={name} />
                      </Link>
                    ),
                  )
                )}
              </div>
            </div>
          );
        })}
        {selectedVariant && (
          <div className="grid items-stretch gap-4">
            {isOutOfStock ? (
              <Button variant="secondary" disabled>
                <Text>Sold out</Text>
              </Button>
            ) : (
              <>
                <AddToCartButton
                  lines={[
                    {
                      merchandiseId: selectedVariant.id!,
                      quantity: 1,
                    },
                  ]}
                  variant="primary"
                  data-test="add-to-cart"
                  className="w-full justify-center text-sm font-semibold uppercase tracking-[0.4em] text-contrast"
                >
                  Add to Cart
                </AddToCartButton>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-primary shadow-glow">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary/60">
                        Current price
                      </p>
                      <div className="flex items-baseline gap-3">
                        <Money
                          withoutTrailingZeros
                          data={selectedVariant?.price!}
                          as="span"
                          data-test="price"
                          className="text-3xl font-semibold text-contrast"
                        />
                        {isOnSale && (
                          <Money
                            withoutTrailingZeros
                            data={selectedVariant?.compareAtPrice!}
                            as="span"
                            className="text-lg font-medium text-primary/50 line-through"
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-2 text-sm sm:items-end">
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/60">
                        Availability
                      </p>
                      <span className="rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-accent">
                        In stock
                      </span>
                    </div>
                  </div>
                  {material && (
                    <MaterialBadge material={material} className="mt-4" />
                  )}
                </div>
              </>
            )}
            {!isOutOfStock && (
              <ShopPayButton
                width="100%"
                variantIds={[selectedVariant?.id!]}
                storeDomain={storeDomain}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductOptionSwatch({
  swatch,
  name,
}: {
  swatch?: Maybe<ProductOptionValueSwatch> | undefined;
  name: string;
}) {
  const image = swatch?.image?.previewImage?.url;
  const color = swatch?.color;

  if (!image && !color) return name;

  return (
    <div
      aria-label={name}
      className="w-8 h-8"
      style={{
        backgroundColor: color || 'transparent',
      }}
    >
      {!!image && <img src={image} alt={name} />}
    </div>
  );
}

function ProductDetail({
  title,
  content,
  learnMore,
}: {
  title: string;
  content: string;
  learnMore?: string;
}) {
  return (
    <Disclosure key={title} as="div" className="grid w-full gap-2">
      {({open}) => (
        <>
          <Disclosure.Button className="text-left">
            <div className="flex justify-between">
              <Text size="lead" as="h4">
                {title}
              </Text>
              <IconClose
                className={clsx(
                  'transition-transform transform-gpu duration-200',
                  !open && 'rotate-[45deg]',
                )}
              />
            </div>
          </Disclosure.Button>

          <Disclosure.Panel className={'pb-4 pt-2 grid gap-2'}>
            <div
              className="prose dark:prose-invert"
              dangerouslySetInnerHTML={{__html: content}}
            />
            {learnMore && (
              <div className="">
                <Link
                  className="pb-px border-b border-primary/30 text-primary/50"
                  to={learnMore}
                >
                  Learn more
                </Link>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    id
    availableForSale
    selectedOptions {
      name
      value
    }
    image {
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    compareAtPrice {
      amount
      currencyCode
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
    media(first: 7) {
      nodes {
        ...Media
      }
    }
    printMaterial: metafield(namespace: "custom", key: "print_material") {
      value
    }
    dimensions: metafield(namespace: "custom", key: "dimensions") {
      value
    }
    standardLayerHeight: metafield(
      namespace: "custom"
      key: "standard_layer_height"
    ) {
      value
    }
    premiumLayerHeight: metafield(
      namespace: "custom"
      key: "premium_layer_height"
    ) {
      value
    }
    standardInfill: metafield(namespace: "custom", key: "standard_infill") {
      value
    }
    premiumInfill: metafield(namespace: "custom", key: "premium_infill") {
      value
    }
    standardPrintTime: metafield(
      namespace: "custom"
      key: "standard_print_time"
    ) {
      value
    }
    premiumPrintTime: metafield(
      namespace: "custom"
      key: "premium_print_time"
    ) {
      value
    }
    weight: metafield(namespace: "custom", key: "weight") {
      value
    }
    gridfinityUnits: metafield(namespace: "custom", key: "gridfinity_units") {
      value
    }
    model3d: metafield(namespace: "custom", key: "model_3d") {
      reference {
        ... on Model3d {
          id
          alt
          mediaContentType
          sources {
            mimeType
            url
          }
          previewImage {
            url
          }
        }
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
    shop {
      name
      primaryDomain {
        url
      }
      shippingPolicy {
        body
        handle
      }
      refundPolicy {
        body
        handle
      }
    }
  }
  ${MEDIA_FRAGMENT}
  ${PRODUCT_FRAGMENT}
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  query productRecommendations(
    $productId: ID!
    $count: Int
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    recommended: productRecommendations(productId: $productId) {
      ...ProductCard
    }
    additional: products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;

async function getRecommendedProducts(
  storefront: LoaderFunctionArgs['context']['storefront'],
  productId: string,
) {
  const products = await storefront.query(RECOMMENDED_PRODUCTS_QUERY, {
    variables: {productId, count: 12},
  });

  invariant(products, 'No data returned from Shopify API');

  const mergedProducts = (products.recommended ?? [])
    .concat(products.additional.nodes)
    .filter(
      (value, index, array) =>
        array.findIndex((value2) => value2.id === value.id) === index,
    );

  const originalProduct = mergedProducts.findIndex(
    (item) => item.id === productId,
  );

  mergedProducts.splice(originalProduct, 1);

  return {nodes: mergedProducts};
}

function buildPrintDetails(product: ProductFragment): ProductPrintDetails {
  const standardLayerHeight =
    parseNumberMetafield(product.standardLayerHeight?.value) ?? 0.2;
  const premiumLayerHeight =
    parseNumberMetafield(product.premiumLayerHeight?.value) ?? 0.12;

  const standardInfill =
    parseNumberMetafield(product.standardInfill?.value) ?? 15;
  const premiumInfill =
    parseNumberMetafield(product.premiumInfill?.value) ?? 25;

  const standardPrintTime =
    parseNumberMetafield(product.standardPrintTime?.value) ?? 2;
  const premiumPrintTime =
    parseNumberMetafield(product.premiumPrintTime?.value) ?? 4;

  const qualityPresets: Record<QualityTierKey, QualityPresetConfig> = {
    standard: {
      label: 'Standard',
      summary: 'Fast everyday quality',
      layerHeight: standardLayerHeight,
      infill: standardInfill,
      printTimeHours: standardPrintTime,
      features: ['Fast lead time', 'Reliable tolerances'],
    },
    premium: {
      label: 'Premium',
      summary: 'Display-ready smooth finish',
      layerHeight: premiumLayerHeight,
      infill: premiumInfill,
      printTimeHours: premiumPrintTime,
      features: ['Ironing enabled', 'Slow perimeters for crisp overhangs'],
    },
  };

  return {
    material: product.printMaterial?.value ?? undefined,
    weightGrams: parseNumberMetafield(product.weight?.value),
    gridfinityUnits: product.gridfinityUnits?.value ?? undefined,
    dimensions: parseDimensionsMetafield(product.dimensions?.value),
    qualityPresets,
  };
}

function parseDimensionsMetafield(value?: string | null): DimensionsMeta | undefined {
  if (!value) return undefined;
  try {
    const parsed = JSON.parse(value) as Record<string, unknown>;
    return {
      length: toNumber(parsed.length ?? parsed.l),
      width: toNumber(parsed.width ?? parsed.w),
      height: toNumber(parsed.height ?? parsed.h),
      unit: typeof parsed.unit === 'string' ? (parsed.unit as string) : 'mm',
    };
  } catch {
    return undefined;
  }
}

function parseNumberMetafield(value?: string | null) {
  if (value == null) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function toNumber(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function getSelectedQuality(
  variant?: ProductFragment['selectedOrFirstAvailableVariant'],
) {
  return variant?.selectedOptions?.find(
    (option) => option.name.toLowerCase() === 'quality',
  )?.value;
}

function getGalleryMedia(product: ProductFragment): MediaFragment[] {
  const nodes = product.media?.nodes ?? [];
  const referenced = product.model3d?.reference;
  if (isModel3dMedia(referenced)) {
    return [referenced, ...nodes];
  }
  return nodes;
}

function isModel3dMedia(
  media: unknown,
): media is Extract<MediaFragment, {__typename: 'Model3d'}> {
  return (
    typeof media === 'object' &&
    media !== null &&
    '__typename' in media &&
    (media as {__typename: string}).__typename === 'Model3d'
  );
}

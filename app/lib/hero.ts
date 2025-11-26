import type {
  Media,
  MediaImage,
  Video as MediaVideo,
} from '@shopify/hydrogen/storefront-api-types';
import type {HeroProps} from '~/components/Hero';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type HeroMetaobjectField = {
  reference?: HeroMetaobject | null;
} | null;

export type HeroMetaobject = {
  handle?: string | null;
  heading?: {value?: string | null} | null;
  byline?: {value?: string | null} | null;
  cta?: {value?: string | null} | null;
  collectionRef?: {
    reference?: {
      handle?: string | null;
    } | null;
  } | null;
  spread?: HeroMediaField;
  spreadSecondary?: HeroMediaField;
  height?: {value?: string | null} | null;
  top?: {value?: string | null} | null;
  loading?: {value?: string | null} | null;
};

export type HeroMediaField = {
  reference?: Media | MediaImage | MediaVideo | null;
} | null;

export type RouteHeroesMetaobject = {
  primaryHero?: HeroMetaobjectField;
  secondaryHero?: HeroMetaobjectField;
  tertiaryHero?: HeroMetaobjectField;
} | null;

// ─────────────────────────────────────────────────────────────────────────────
// Utility Functions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Transform a hero metaobject field into HeroProps for the Hero component
 */
export function transformHeroField(
  field?: HeroMetaobjectField,
): HeroProps | null {
  const hero = field?.reference;
  if (!hero) {
    return null;
  }

  const handle = hero.collectionRef?.reference?.handle ?? null;
  const height = hero.height?.value === 'full' ? 'full' : undefined;
  const top = hero.top?.value === 'true';
  const loading = hero.loading?.value === 'eager' ? 'eager' : 'lazy';
  const spread = hero.spread?.reference ? hero.spread : null;
  const spreadSecondary = hero.spreadSecondary?.reference
    ? hero.spreadSecondary
    : null;

  return {
    handle,
    heading: hero.heading ?? null,
    byline: hero.byline ?? null,
    cta: hero.cta ?? null,
    spread,
    spreadSecondary,
    height,
    top,
    loading,
  };
}

/**
 * Parse route metaobject heroes into HeroProps
 */
export function parseRouteHeroes(route: RouteHeroesMetaobject) {
  return {
    primaryHero: transformHeroField(route?.primaryHero),
    secondaryHero: transformHeroField(route?.secondaryHero),
    tertiaryHero: transformHeroField(route?.tertiaryHero),
  };
}

/**
 * Get a renderable hero, falling back to placeholder if metaobject hero has no content
 */
export function getRenderableHero(
  hero: HeroProps | null | undefined,
  fallback: HeroProps,
): HeroProps | null {
  // If we have a hero with content (heading or spread image), use it
  if (hero?.heading?.value || hero?.spread?.reference) {
    return hero;
  }

  // Otherwise fall back to placeholder if it has content
  if (fallback?.heading?.value || fallback?.spread?.reference) {
    return fallback;
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// GraphQL Fragments
// ─────────────────────────────────────────────────────────────────────────────

export const HERO_MEDIA_FRAGMENT = `#graphql
  fragment HeroMedia on MediaImage {
    __typename
    id
    mediaContentType
    alt
    previewImage {
      url
    }
    image {
      id
      url
      width
      height
    }
  }
` as const;

export const HERO_METAOBJECT_FRAGMENT = `#graphql
  fragment HeroMetaobject on Metaobject {
    id
    handle
    heading: field(key: "heading") {
      value
    }
    byline: field(key: "byline") {
      value
    }
    cta: field(key: "cta_label") {
      value
    }
    collectionRef: field(key: "collection") {
      reference {
        ... on Collection {
          handle
        }
      }
    }
    spread: field(key: "spread_primary") {
      reference {
        ... on MediaImage {
          ...HeroMedia
        }
      }
    }
    spreadSecondary: field(key: "spread_secondary") {
      reference {
        ... on MediaImage {
          ...HeroMedia
        }
      }
    }
    height: field(key: "height") {
      value
    }
    top: field(key: "is_top") {
      value
    }
    loading: field(key: "loading_priority") {
      value
    }
  }
  ${HERO_MEDIA_FRAGMENT}
` as const;

export const ROUTE_SECTIONS_QUERY = `#graphql
  query routeSections($handle: MetaobjectHandleInput!) {
    route: metaobject(handle: $handle) {
      primaryHero: field(key: "primary_hero") {
        reference {
          ...HeroMetaobject
        }
      }
      secondaryHero: field(key: "secondary_hero") {
        reference {
          ...HeroMetaobject
        }
      }
      tertiaryHero: field(key: "tertiary_hero") {
        reference {
          ...HeroMetaobject
        }
      }
    }
  }
  ${HERO_METAOBJECT_FRAGMENT}
` as const;


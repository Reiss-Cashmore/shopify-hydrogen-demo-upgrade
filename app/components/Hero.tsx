import clsx from 'clsx';
import {MediaFile} from '@shopify/hydrogen';
import type {
  MediaImage,
  Media,
  Video as MediaVideo,
} from '@shopify/hydrogen/storefront-api-types';

import type {CollectionContentFragment} from 'storefrontapi.generated';
import {Heading, Text} from '~/components/Text';
import {Link} from '~/components/Link';
import {Button} from '~/components/Button';

type HeroProps = CollectionContentFragment & {
  height?: 'full';
  top?: boolean;
  loading?: HTMLImageElement['loading'];
};

/**
 * Hero component that renders metafields attached to collection resources
 **/
export function Hero({
  byline,
  cta,
  handle,
  heading,
  height,
  loading,
  spread,
  spreadSecondary,
  top,
}: HeroProps) {
  const topSpacing = top ? 'mt-6' : '';

  return (
    <Link to={`/collections/${handle}`} prefetch="viewport">
      <section
        className={clsx(
          'relative flex w-full flex-col overflow-hidden rounded-[2.5rem] border border-white/10 bg-surface/80 shadow-glow',
          topSpacing,
          height === 'full'
            ? 'h-screen'
            : 'aspect-[4/5] sm:aspect-[3/2] lg:min-h-[28rem]',
        )}
      >
        <div className="absolute inset-0 -z-10 grid flex-grow grid-flow-col pointer-events-none auto-cols-fr content-stretch">
          {spread?.reference && (
            <div className="h-full w-full">
              <SpreadMedia
                sizes={
                  spreadSecondary?.reference
                    ? '(min-width: 48em) 50vw, 100vw'
                    : '100vw'
                }
                data={spread.reference as Media}
                loading={loading}
              />
            </div>
          )}
          {spreadSecondary?.reference && (
            <div className="hidden md:block h-full w-full">
              <SpreadMedia
                sizes="50vw"
                data={spreadSecondary.reference as Media}
                loading={loading}
              />
            </div>
          )}
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-contrast/70 via-surface/60 to-transparent" />
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="h-full w-full bg-grid-overlay" />
        </div>
        <div className="relative flex h-full flex-col justify-between gap-6 px-6 py-8 text-primary sm:px-10 md:px-14">
          <div className="flex flex-col gap-4">
            {heading?.value && (
              <Heading
                format
                as="h2"
                size="display"
                className="max-w-2xl text-contrast drop-shadow-[0_15px_45px_rgba(0,0,0,0.45)]"
              >
                {heading.value}
              </Heading>
            )}
            {byline?.value && (
              <Text
                format
                width="narrow"
                as="p"
                size="lead"
                className="text-primary/80"
              >
                {byline.value}
              </Text>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button as="span" variant="primary" width="auto">
              {cta?.value ?? 'Shop now'}
            </Button>
            <Text size="fine" className="text-primary/70">
              Explore the generator presets
            </Text>
          </div>
        </div>
      </section>
    </Link>
  );
}

type SpreadMediaProps = {
  data: Media | MediaImage | MediaVideo;
  loading?: HTMLImageElement['loading'];
  sizes: string;
};

function SpreadMedia({data, loading, sizes}: SpreadMediaProps) {
  return (
    <MediaFile
      data={data}
      className="block object-cover w-full h-full align-bottom leading-none"
      mediaOptions={{
        video: {
          controls: false,
          muted: true,
          loop: true,
          playsInline: true,
          autoPlay: true,
          previewImageOptions: {src: data.previewImage?.url ?? ''},
        },
        image: {
          loading,
          crop: 'center',
          sizes,
          alt: data.alt || '',
        },
      }}
    />
  );
}

import {Image, ModelViewer} from '@shopify/hydrogen';

import type {MediaFragment} from 'storefrontapi.generated';

/**
 * A client component that defines a media gallery for hosting images, 3D models, and videos of products
 */
export function ProductGallery({
  media,
  className,
}: {
  media: MediaFragment[];
  className?: string;
}) {
  if (!media.length) {
    return null;
  }

  return (
    <div
      className={`swimlane md:grid-flow-row hiddenScroll md:p-0 md:overflow-x-auto md:grid-cols-2 ${className}`}
    >
      {media.map((med, i) => {
        const isFirst = i === 0;
        const isFourth = i === 3;
        const isFullWidth = i % 3 === 0;

        const isModel3d = med.__typename === 'Model3d';
        const image =
          med.__typename === 'MediaImage'
            ? {...med.image, altText: med.alt || 'Product image'}
            : null;

        const cardClasses = ['aspect-square snap-center card-image bg-white dark:bg-contrast/10 w-mobileGallery md:w-full'];
        if (!isFirst && !isFourth) {
          cardClasses.push('md:aspect-[4/5]');
        }
        if (isFullWidth) {
          cardClasses.push('md:col-span-2');
        } else {
          cardClasses.push('md:col-span-1');
        }
        if (isModel3d) {
          cardClasses.push('card-image--interactive');
        }

        const cardStyle = isModel3d ? {padding: 0} : undefined;

        return (
          <div
            className={cardClasses.join(' ')}
            key={med.id || image?.id}
            style={cardStyle}
          >
            {isModel3d && <ModelViewerFrame media={med} />}
            {image && (
              <Image
                loading={i === 0 ? 'eager' : 'lazy'}
                data={image}
                aspectRatio={!isFirst && !isFourth ? '4/5' : undefined}
                sizes={
                  isFirst || isFourth
                    ? '(min-width: 48em) 60vw, 90vw'
                    : '(min-width: 48em) 30vw, 90vw'
                }
                className="object-cover w-full h-full aspect-square fadeIn"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

type Model3dMedia = Extract<MediaFragment, {__typename: 'Model3d'}>;

function ModelViewerFrame({media}: {media: Model3dMedia}) {
  const normalizedSources = reorderModelSources(media.sources ?? []);
  const normalizedMedia = {...media, sources: normalizedSources};

  return (
    <ModelViewer
      data={normalizedMedia}
      ar
      arModes="webxr scene-viewer quick-look"
      cameraControls
      autoRotate
      shadowIntensity={1}
      exposure={1.1}
      poster={media.previewImage?.url ?? undefined}
      className="block h-full w-full rounded-[1.5rem] border border-white/10 bg-surface/90"
    >
      <button
        slot="ar-button"
        className="rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-contrast shadow-glow"
      >
        View in AR
      </button>
    </ModelViewer>
  );
}

function reorderModelSources(
  sources: NonNullable<Model3dMedia['sources']>,
): NonNullable<Model3dMedia['sources']> {
  if (!sources?.length) return sources ?? [];
  const nextSources = [...sources];
  const glbIndex = nextSources.findIndex(
    (source) => source.mimeType === 'model/gltf-binary',
  );
  if (glbIndex > 0) {
    const [glbSource] = nextSources.splice(glbIndex, 1);
    nextSources.unshift(glbSource);
  }
  return nextSources;
}

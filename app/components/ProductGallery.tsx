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

        const style = [
          isFullWidth ? 'md:col-span-2' : 'md:col-span-1',
          isFirst || isFourth ? '' : 'md:aspect-[4/5]',
          'aspect-square snap-center card-image bg-white dark:bg-contrast/10 w-mobileGallery md:w-full',
        ].join(' ');

        return (
          <div className={style} key={med.id || image?.id}>
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
  return (
    <ModelViewer
      data={media}
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

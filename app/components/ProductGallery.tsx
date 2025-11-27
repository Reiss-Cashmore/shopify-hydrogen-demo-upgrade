import {useCallback, useEffect, useRef} from 'react';
import {Image, ModelViewer} from '@shopify/hydrogen';
import type {ModelViewerElement} from '@google/model-viewer/lib/model-viewer.js';

import type {MediaFragment} from 'storefrontapi.generated';

const ModelViewerAny =
  ModelViewer as unknown as (props: any) => JSX.Element | null;

/**
 * A client component that defines a media gallery for hosting images, 3D models, and videos of products
 */
export function ProductGallery({
  media,
  className,
  colorVariantKey,
}: {
  media: MediaFragment[];
  className?: string;
  colorVariantKey?: string;
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

        const normalizedVariantKey = colorVariantKey ?? '__default__';
        const baseKey = med.id || image?.id || `${i}`;
        const cardKey = isModel3d
          ? `${baseKey}-${normalizedVariantKey}`
          : baseKey;

        return (
          <div
            className={cardClasses.join(' ')}
            key={cardKey}
            style={cardStyle}
          >
            {isModel3d && (
              <ModelViewerFrame media={med} colorVariantKey={colorVariantKey} />
            )}
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

function ModelViewerFrame({
  media,
  colorVariantKey,
}: {
  media: Model3dMedia;
  colorVariantKey?: string;
}) {
  const viewerRef = useRef<ModelViewerElement | null>(null);
  const appliedKeyRef = useRef<string | undefined>();
  const normalizedVariantKey = colorVariantKey ?? '__default__';
  const arButton = (
    <button
      slot="ar-button"
      className="rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-contrast shadow-glow"
    >
      View in AR
    </button>
  );

  const applyRandomColorToAllMaterials = useCallback(() => {
    const viewer = viewerRef.current;
    const materials = viewer?.model?.materials;
    if (!materials || !materials.length) return;

    const primaryColor = getRandomLinearColor();
    const rulerColor = getContrastingLinearColor(primaryColor);

    materials.forEach((material) => {
      try {
        const targetColor = isRulerMaterial(material) ? rulerColor : primaryColor;
        material?.pbrMetallicRoughness?.setBaseColorFactor?.(targetColor);
      } catch (error) {
        console.warn('Unable to update material color', error);
      }
    });
  }, []);

  const handleSceneGraphReady = useCallback(
    (event: Event) => {
      viewerRef.current = event.target as ModelViewerElement;
      appliedKeyRef.current = undefined;

      applyRandomColorToAllMaterials();
      appliedKeyRef.current = normalizedVariantKey;
    },
    [applyRandomColorToAllMaterials, normalizedVariantKey],
  );

  useEffect(() => {
    if (!viewerRef.current) return;
    if (appliedKeyRef.current === normalizedVariantKey) return;

    applyRandomColorToAllMaterials();
    appliedKeyRef.current = normalizedVariantKey;
  }, [applyRandomColorToAllMaterials, normalizedVariantKey]);

  const normalizedSources = reorderModelSources(media.sources ?? []);
  const normalizedMedia = {...media, sources: normalizedSources};

  return (
    <ModelViewerAny
      data={normalizedMedia}
      ar
      arModes="webxr scene-viewer quick-look"
      cameraControls
      autoRotate
      shadowIntensity={1}
      exposure={1.1}
      poster={media.previewImage?.url ?? undefined}
      className="block h-full w-full rounded-[1.5rem] border border-white/10 bg-surface/90"
      onSceneGraphReady={handleSceneGraphReady}
    >
      {arButton}
    </ModelViewerAny>
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

function getRandomLinearColor() {
  const randomChannel = () => Math.random();
  const srgbToLinear = (channel: number) =>
    channel <= 0.04045
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4);

  const r = randomChannel();
  const g = randomChannel();
  const b = randomChannel();

  return [
    srgbToLinear(r),
    srgbToLinear(g),
    srgbToLinear(b),
    1,
  ] as [number, number, number, number];
}

function getContrastingLinearColor(
  rgba: [number, number, number, number],
): [number, number, number, number] {
  const invert = (channel: number) => 1 - channel;
  return [invert(rgba[0]), invert(rgba[1]), invert(rgba[2]), 1];
}

function isRulerMaterial(material?: {name?: string | null} | null) {
  const name = material?.name?.toLowerCase();
  if (!name) return false;
  return name.includes('ruler');
}

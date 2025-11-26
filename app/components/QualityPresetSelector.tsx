import clsx from 'clsx';

import {Link} from '~/components/Link';
import {Heading, Text} from '~/components/Text';
import {IconCheck} from '~/components/Icon';
import {
  formatInfill,
  formatLayerHeight,
  formatPrintTime,
} from '~/lib/print';

type QualityOptionValue = {
  name: string;
  variantUriQuery: string;
  handle: string;
  selected: boolean;
  available: boolean;
  isDifferentProduct?: boolean;
};

export type QualityPreset = {
  label: string;
  summary: string;
  layerHeight?: number;
  infill?: number;
  printTimeHours?: number;
  features?: string[];
};

type QualityPresetSelectorProps = {
  title: string;
  options: QualityOptionValue[];
  presets: Record<string, QualityPreset>;
};

export function QualityPresetSelector({
  title,
  options,
  presets,
}: QualityPresetSelectorProps) {
  return (
    <div className="flex flex-col gap-4">
      <Heading as="legend" size="lead">
        {title}
      </Heading>
      <div className="grid gap-4 sm:grid-cols-2">
        {options.map((option) => {
          const preset = getPreset(presets, option.name);
          const presetFeatures = preset?.features?.length
            ? preset.features
            : undefined;

          return (
            <Link
              key={`${title}-${option.name}`}
              {...(!option.isDifferentProduct ? {rel: 'nofollow'} : {})}
              to={`/products/${option.handle}?${option.variantUriQuery}`}
              preventScrollReset
              prefetch="intent"
              replace
              className={clsx(
                'group relative flex flex-col gap-4 rounded-3xl border px-5 py-4 text-left shadow-glow transition',
                option.selected
                  ? 'border-accent bg-accent/10 text-primary'
                  : 'border-white/10 bg-white/5 text-primary/80 hover:border-white/20',
                !option.available && 'cursor-not-allowed opacity-40',
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <Text
                    as="span"
                    className="text-[0.75rem] font-semibold uppercase tracking-[0.4em]"
                  >
                    {preset?.label ?? option.name}
                  </Text>
                  <Text size="fine" className="text-primary/70">
                    {preset?.summary ?? 'Balanced quality & speed'}
                  </Text>
                </div>
                <span
                  aria-hidden
                  className={clsx(
                    'flex h-6 w-6 items-center justify-center rounded-full border transition',
                    option.selected
                      ? 'border-accent bg-accent text-contrast'
                      : 'border-white/20 bg-transparent text-transparent',
                  )}
                >
                  <IconCheck />
                </span>
              </div>
              <dl className="grid gap-3 text-sm">
                <SpecRow
                  label="Layer height"
                  value={formatLayerHeight(preset?.layerHeight)}
                />
                <SpecRow
                  label="Infill"
                  value={formatInfill(preset?.infill)}
                />
                <SpecRow
                  label="Print time"
                  value={formatPrintTime(preset?.printTimeHours)}
                />
                {presetFeatures && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {presetFeatures.map((feature) => (
                      <span
                        key={feature}
                        className={clsx(
                          'rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em]',
                          option.selected
                            ? 'border-accent/50 bg-accent/10 text-accent'
                            : 'border-white/15 bg-white/5 text-primary/60',
                        )}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </dl>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function SpecRow({label, value}: {label: string; value: string}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <Text as="span" size="fine" className="text-primary/60">
        {label}
      </Text>
      <Text as="span" className="font-semibold text-primary">
        {value}
      </Text>
    </div>
  );
}

function getPreset(
  presets: Record<string, QualityPreset>,
  rawName: string,
): QualityPreset | undefined {
  const normalized = rawName?.toLowerCase();
  return presets[normalized] ?? presets[rawName];
}


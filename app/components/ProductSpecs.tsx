import {Heading, Text} from '~/components/Text';
import {
  formatDimensions,
  formatInfill,
  formatLayerHeight,
  formatPrintTime,
  formatWeight,
  type DimensionsMeta,
} from '~/lib/print';

type QualitySpec = {
  layerHeight?: number;
  infill?: number;
  printTimeHours?: number;
};

type ProductSpecsProps = {
  material?: string;
  weightGrams?: number;
  gridfinityUnits?: string;
  dimensions?: DimensionsMeta;
  selectedQuality?: string;
  qualityPresets?: Record<string, QualitySpec>;
};

export function ProductSpecs({
  dimensions,
  material,
  weightGrams,
  gridfinityUnits,
  qualityPresets,
  selectedQuality,
}: ProductSpecsProps) {
  const rows = buildRows({
    dimensions,
    material,
    weightGrams,
    gridfinityUnits,
    qualityPresets,
    selectedQuality,
  });

  if (!rows.length) return null;

  return (
    <section className="glass-panel flex flex-col gap-6 rounded-[1.5rem] border border-white/10 p-6">
      <Heading as="h3" size="lead" className="uppercase tracking-[0.4em]">
        Print Specs
      </Heading>
      <dl className="grid gap-4 sm:grid-cols-2">
        {rows.map(({label, value}) => (
          <div key={label} className="flex flex-col gap-1">
            <Text as="dt" size="fine" className="text-primary/60">
              {label}
            </Text>
            <Text as="dd" className="text-base font-semibold text-primary">
              {value}
            </Text>
          </div>
        ))}
      </dl>
    </section>
  );
}

type RowInput = {
  dimensions?: DimensionsMeta;
  material?: string;
  weightGrams?: number;
  gridfinityUnits?: string;
  selectedQuality?: string;
  qualityPresets?: Record<string, QualitySpec>;
};

function buildRows({
  dimensions,
  material,
  weightGrams,
  gridfinityUnits,
  selectedQuality,
  qualityPresets,
}: RowInput) {
  const rows: {label: string; value: string}[] = [];
  if (material) {
    rows.push({label: 'Material', value: material});
  }
  const dimensionCopy = formatDimensions(dimensions);
  if (dimensionCopy) {
    rows.push({label: 'Footprint', value: dimensionCopy});
  }
  const weightCopy = formatWeight(weightGrams);
  if (weightCopy) {
    rows.push({label: 'Weight', value: weightCopy});
  }
  if (gridfinityUnits) {
    rows.push({
      label: 'Gridfinity base',
      value: gridfinityUnits.toUpperCase(),
    });
  }

  const preset = getPresetValue(qualityPresets, selectedQuality);
  if (preset) {
    rows.push({
      label: 'Layer height',
      value: formatLayerHeight(preset.layerHeight),
    });
    rows.push({label: 'Infill', value: formatInfill(preset.infill)});
    rows.push({
      label: 'Estimated print time',
      value: formatPrintTime(preset.printTimeHours),
    });
  }

  return rows;
}

function getPresetValue(
  presets?: Record<string, QualitySpec>,
  selected?: string,
) {
  if (!presets) return null;
  if (selected) {
    const normalized = selected.toLowerCase();
    const preset = presets[normalized] ?? presets[selected];
    if (preset) return preset;
  }
  return presets.standard ?? presets.premium ?? null;
}


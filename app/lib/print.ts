import type {CSSProperties} from 'react';

export type DimensionsMeta = {
  length?: number;
  width?: number;
  height?: number;
  unit?: string;
};

export function formatLayerHeight(
  millimeters?: number,
  fallback = '0.20 mm',
) {
  if (typeof millimeters !== 'number' || Number.isNaN(millimeters)) {
    return fallback;
  }
  return `${trimZeros(millimeters)} mm`;
}

export function formatInfill(percent?: number, fallback = '15%') {
  if (typeof percent !== 'number' || Number.isNaN(percent)) {
    return fallback;
  }
  return `${trimZeros(percent)}%`;
}

export function formatPrintTime(hours?: number, fallback = '2 hr') {
  if (typeof hours !== 'number' || Number.isNaN(hours)) {
    return fallback;
  }
  const totalMinutes = Math.round(hours * 60);
  if (totalMinutes < 60) {
    return `${totalMinutes} min`;
  }
  const hrs = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return minutes === 0 ? `${hrs} hr` : `${hrs} hr ${minutes} min`;
}

export function formatWeight(grams?: number) {
  if (typeof grams !== 'number' || Number.isNaN(grams)) {
    return null;
  }
  if (grams >= 1000) {
    return `${trimZeros(grams / 1000)} kg`;
  }
  return `${trimZeros(grams)} g`;
}

export function formatDimensions(dimensions?: DimensionsMeta) {
  if (!dimensions) return null;
  const {length, width, height, unit = 'mm'} = dimensions;
  const values = [length, width, height]
    .filter((value) => typeof value === 'number' && !Number.isNaN(value))
    .map((value) => trimZeros(value as number));
  if (!values.length) return null;
  return `${values.join(' × ')} ${unit}`;
}

export function buildGridTemplate(columns: number): CSSProperties['gridTemplateColumns'] {
  if (!Number.isFinite(columns) || columns <= 0) {
    return undefined;
  }
  return `repeat(${columns}, minmax(0, 1fr))`;
}

function trimZeros(value: number) {
  return Number.parseFloat(value.toFixed(2)).toString();
}


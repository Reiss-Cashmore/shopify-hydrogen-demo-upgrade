import clsx from 'clsx';

const MATERIAL_STYLES: Record<
  string,
  {bg: string; border: string; text: string; tooltip: string}
> = {
  PLA: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-400/30',
    text: 'text-emerald-200',
    tooltip: 'PLA — great detail, low warp, heat-safe to ~60°C',
  },
  PETG: {
    bg: 'bg-sky-500/10',
    border: 'border-sky-400/30',
    text: 'text-sky-200',
    tooltip: 'PETG — durable & chemical resistant, heat-safe to ~80°C',
  },
  ASA: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-400/30',
    text: 'text-orange-200',
    tooltip: 'ASA — outdoor safe with high UV and heat resistance',
  },
  TPU: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-400/30',
    text: 'text-purple-200',
    tooltip: 'TPU — flexible and impact-resistant for grips & bumpers',
  },
};

export function MaterialBadge({
  material,
  className,
}: {
  material?: string | null;
  className?: string;
}) {
  if (!material) return null;
  const normalized = material.toUpperCase();
  const style = MATERIAL_STYLES[normalized] ?? {
    bg: 'bg-white/5',
    border: 'border-white/20',
    text: 'text-primary',
    tooltip: 'Custom polymer blend',
  };

  return (
    <span
      title={style.tooltip}
      className={clsx(
        'inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em]',
        style.bg,
        style.border,
        style.text,
        className,
      )}
    >
      {normalized}
    </span>
  );
}


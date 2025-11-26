import {Heading, Text} from '~/components/Text';
import {Link} from '~/components/Link';
import {buildGridTemplate} from '~/lib/print';

type GridfinityCompatProps = {
  units?: string | null;
};

export function GridfinityCompat({units}: GridfinityCompatProps) {
  if (!units) return null;
  const {cols, rows} = parseUnits(units);
  if (!cols || !rows) return null;

  const cellKeys = Array.from({length: rows}, (_, rowIndex) =>
    Array.from({length: cols}, (_, colIndex) => `${rowIndex}-${colIndex}`),
  ).flat();

  return (
    <section className="glass-panel flex flex-col gap-5 rounded-[1.5rem] border border-white/10 p-6">
      <div className="flex flex-col gap-1">
        <Heading as="h3" size="lead" className="uppercase tracking-[0.4em]">
          Gridfinity Ready
        </Heading>
        <Text size="fine" className="text-primary/70">
          Drops onto any {units.toUpperCase()} base. Snaps flush with standard
          42&nbsp;mm tiles.
        </Text>
      </div>
      <div
        className="grid gap-2"
        style={{gridTemplateColumns: buildGridTemplate(cols)}}
        aria-label={`Grid preview ${cols} by ${rows}`}
      >
        {cellKeys.map((key) => (
          <span
            key={key}
            className="aspect-square rounded-xl border border-white/15 bg-white/5 shadow-inner"
          />
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Text size="fine" className="text-primary/60">
          Pair with trays, lids, or handles for modular kits.
        </Text>
        <Link
          to="/collections/gridfinity"
          className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-accent transition hover:text-accent/80"
        >
          Shop Base Plates &rsaquo;
        </Link>
      </div>
    </section>
  );
}

function parseUnits(units: string) {
  const sanitized = units.toLowerCase().replace(/\s+/g, '');
  const [cols, rows] = sanitized.split('x').map((value) => Number(value));
  return {
    cols: Number.isFinite(cols) ? cols : 0,
    rows: Number.isFinite(rows) ? rows : 0,
  };
}


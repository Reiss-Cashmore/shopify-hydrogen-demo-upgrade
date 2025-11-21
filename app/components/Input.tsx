import clsx from 'clsx';

export function Input({
  className = '',
  type,
  variant,
  ...props
}: {
  className?: string;
  type?: string;
  variant: 'search' | 'minisearch';
  [key: string]: any;
}) {
  const variants = {
    search:
      'w-full rounded-full border border-white/15 bg-white/5 px-5 py-3 text-copy text-primary placeholder:text-primary/40 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-accent/40 transition',
    minisearch:
      'hidden md:inline-flex items-center rounded-full border border-transparent bg-white/5 px-4 py-2 text-sm text-primary placeholder:text-primary/30 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-accent/40 transition',
  };

  const styles = clsx(variants[variant], className);

  return <input type={type} {...props} className={styles} />;
}

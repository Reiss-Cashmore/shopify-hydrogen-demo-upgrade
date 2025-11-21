import {forwardRef} from 'react';
import {Link} from 'react-router';
import clsx from 'clsx';

import {missingClass} from '~/lib/utils';

export const Button = forwardRef(
  (
    {
      as = 'button',
      className = '',
      variant = 'primary',
      width = 'auto',
      ...props
    }: {
      as?: React.ElementType;
      className?: string;
      variant?: 'primary' | 'secondary' | 'inline';
      width?: 'auto' | 'full';
      [key: string]: any;
    },
    ref,
  ) => {
    const Component = props?.to ? Link : as;

    const baseButtonClasses =
      'inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-[0.18em] text-[0.8rem] py-3 px-8 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60';

    const variants = {
      primary: `${baseButtonClasses} bg-gradient-to-r from-[#ff5c8a] via-[#ff7c9e] to-[#ffa3b7] text-contrast shadow-glow hover:-translate-y-0.5`,
      secondary: `${baseButtonClasses} border border-white/20 bg-white/5 text-primary hover:border-white/40 hover:-translate-y-0.5`,
      inline:
        'inline-flex items-center gap-2 border-b border-transparent text-accent tracking-[0.3em] pb-1 hover:border-accent/60 transition-colors',
    };

    const widths = {
      auto: 'w-auto',
      full: 'w-full',
    };

    const styles = clsx(
      missingClass(className, 'bg-') && variants[variant],
      missingClass(className, 'w-') && widths[width],
      className,
    );

    return (
      <Component
        className={styles}
        {...props}
        ref={ref}
      />
    );
  },
);

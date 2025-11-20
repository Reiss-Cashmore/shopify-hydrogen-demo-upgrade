import {forwardRef} from 'react';
import { Link } from 'react-router';
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
      'inline-block rounded-lg font-bold text-center py-3 px-6 transition-all duration-200 hover:scale-105';

    const variants = {
      primary: `${baseButtonClasses} bg-primary text-contrast shadow-lg hover:shadow-xl`,
      secondary: `${baseButtonClasses} border-2 border-primary/20 bg-contrast text-primary hover:border-primary/40`,
      inline: 'border-b-2 border-primary/10 leading-none pb-1 font-semibold hover:border-primary/30 transition-colors',
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
        // @todo: not supported until react-router makes it into Remix.
        // preventScrollReset={true}
        className={styles}
        {...props}
        ref={ref}
      />
    );
  },
);

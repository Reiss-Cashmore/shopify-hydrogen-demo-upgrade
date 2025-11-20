import clsx from 'clsx';
import type {
  ElementType,
  HTMLAttributes,
  ReactNode,
  ComponentPropsWithoutRef,
} from 'react';
import {missingClass, formatText} from '~/lib/utils';

type TextColor = 'default' | 'primary' | 'subtle' | 'notice' | 'contrast';
type TextSize = 'lead' | 'copy' | 'fine';
type TextWidth = 'default' | 'narrow' | 'wide';

export function Text({
  as: Component = 'span',
  className,
  color = 'default',
  format,
  size = 'copy',
  width = 'default',
  children,
  ...props
}: {
  as?: ElementType;
  className?: string;
  color?: TextColor;
  format?: boolean;
  size?: TextSize;
  width?: TextWidth;
  children: ReactNode;
} & Record<string, unknown>) {
  const colors: Record<TextColor, string> = {
    default: 'inherit',
    primary: 'text-primary/90',
    subtle: 'text-primary/50',
    notice: 'text-notice',
    contrast: 'text-contrast/90',
  };

  const sizes: Record<TextSize, string> = {
    lead: 'text-lead font-medium',
    copy: 'text-copy',
    fine: 'text-fine subpixel-antialiased',
  };

  const widths: Record<TextWidth, string> = {
    default: 'max-w-2xl',
    narrow: 'max-w-xl',
    wide: 'max-w-4xl',
  };

  const styles = clsx(
    missingClass(className, 'max-w-') && widths[width],
    missingClass(className, 'whitespace-') && 'whitespace-pre-wrap',
    missingClass(className, 'text-') && colors[color],
    sizes[size],
    className,
  );

  return (
    <Component {...props} className={styles}>
      {format ? formatText(children) : children}
    </Component>
  );
}

type HeadingSize = 'display' | 'heading' | 'lead' | 'copy';

export function Heading({
  as: Component = 'h2',
  children,
  className = '',
  format,
  size = 'heading',
  width = 'default',
  ...props
}: {
  as?: ElementType;
  children: ReactNode;
  format?: boolean;
  size?: HeadingSize;
  width?: TextWidth;
} & HTMLAttributes<HTMLHeadingElement>) {
  const sizes: Record<HeadingSize, string> = {
    display: 'font-bold text-display',
    heading: 'font-bold text-heading',
    lead: 'font-bold text-lead',
    copy: 'font-medium text-copy',
  };

  const widths: Record<TextWidth, string> = {
    default: 'max-w-2xl',
    narrow: 'max-w-xl',
    wide: 'max-w-4xl',
  };

  const styles = clsx(
    missingClass(className, 'whitespace-') && 'whitespace-pre-wrap',
    missingClass(className, 'max-w-') && widths[width],
    missingClass(className, 'font-') && sizes[size],
    className,
  );

  return (
    <Component {...props} className={styles}>
      {format ? formatText(children) : children}
    </Component>
  );
}

type SectionDivider = 'none' | 'top' | 'bottom' | 'both';
type SectionDisplay = 'grid' | 'flex';
type SectionPadding = 'x' | 'y' | 'swimlane' | 'all';

export function Section({
  as: Component = 'section',
  children,
  className,
  divider = 'none',
  display = 'grid',
  heading,
  padding = 'all',
  ...props
}: {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  divider?: SectionDivider;
  display?: SectionDisplay;
  heading?: string;
  padding?: SectionPadding;
} & ComponentPropsWithoutRef<'section'>) {
  const paddings: Record<SectionPadding, string> = {
    x: 'px-6 md:px-8 lg:px-12',
    y: 'py-6 md:py-8 lg:py-12',
    swimlane: 'pt-4 md:pt-8 lg:pt-12 md:pb-4 lg:pb-8',
    all: 'p-6 md:p-8 lg:p-12',
  };

  const dividers: Record<SectionDivider, string> = {
    none: 'border-none',
    top: 'border-t border-primary/05',
    bottom: 'border-b border-primary/05',
    both: 'border-y border-primary/05',
  };

  const displays: Record<SectionDisplay, string> = {
    flex: 'flex',
    grid: 'grid',
  };

  const styles = clsx(
    'w-full gap-4 md:gap-8',
    displays[display],
    missingClass(className, '\\mp[xy]?-') && paddings[padding],
    dividers[divider],
    className,
  );

  return (
    <Component {...props} className={styles}>
      {heading && (
        <Heading size="lead" className={padding === 'y' ? paddings['x'] : ''}>
          {heading}
        </Heading>
      )}
      {children}
    </Component>
  );
}

type PageHeaderVariant = 'default' | 'blogPost' | 'allCollections';

export function PageHeader({
  children,
  className,
  heading,
  variant = 'default',
  ...props
}: {
  children?: ReactNode;
  className?: string;
  heading?: string;
  variant?: PageHeaderVariant;
} & ComponentPropsWithoutRef<'header'>) {
  const variants: Record<PageHeaderVariant, string> = {
    default: 'grid w-full gap-8 p-6 py-8 md:p-8 lg:p-12 justify-items-start',
    blogPost:
      'grid md:text-center w-full gap-4 p-6 py-8 md:p-8 lg:p-12 md:justify-items-center',
    allCollections:
      'flex justify-between items-baseline gap-8 p-6 md:p-8 lg:p-12',
  };

  const styles = clsx(variants[variant], className);

  return (
    <header {...props} className={styles}>
      {heading && (
        <Heading as="h1" width="narrow" size="heading" className="inline-block">
          {heading}
        </Heading>
      )}
      {children}
    </header>
  );
}


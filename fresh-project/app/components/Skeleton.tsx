import clsx from 'clsx';
import type {ElementType} from 'react';

export function Skeleton({
  as: Component = 'div',
  width,
  height,
  className,
  ...props
}: {
  as?: ElementType;
  width?: string;
  height?: string;
  className?: string;
} & Record<string, unknown>) {
  const styles = clsx('rounded bg-primary/10', className);

  return (
    <Component {...props} width={width} height={height} className={styles} />
  );
}



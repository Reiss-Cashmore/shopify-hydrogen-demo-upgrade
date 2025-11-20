import {type FetcherWithComponents} from 'react-router';
import {type ReactNode} from 'react';
import {CartForm, type OptimisticCartLineInput} from '@shopify/hydrogen';

import {Button} from '~/components/Button';

export function AddToCartButton({
  children,
  lines,
  className = '',
  variant = 'primary',
  width = 'full',
  disabled,
  ...props
}: {
  children: ReactNode;
  lines: Array<OptimisticCartLineInput>;
  className?: string;
  variant?: 'primary' | 'secondary' | 'inline';
  width?: 'auto' | 'full';
  disabled?: boolean;
} & Record<string, unknown>) {
  return (
    <CartForm
      route="/cart"
      inputs={{
        lines,
      }}
      action={CartForm.ACTIONS.LinesAdd}
    >
      {(fetcher: FetcherWithComponents<any>) => {
        return (
          <Button
            as="button"
            type="submit"
            width={width}
            variant={variant}
            className={className}
            disabled={disabled ?? fetcher.state !== 'idle'}
            {...props}
          >
            {children}
          </Button>
        );
      }}
    </CartForm>
  );
}

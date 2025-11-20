import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  type NavLinkProps as RouterNavLinkProps,
  type LinkProps as RouterLinkProps,
  useRouteLoaderData,
} from 'react-router';
import type {I18nLocale} from '~/lib/type';

type PrefetchType = 'render' | 'intent' | 'viewport';

type LinkProps = Omit<RouterLinkProps, 'className'> & {
  className?: RouterNavLinkProps['className'] | RouterLinkProps['className'];
  prefetch?: PrefetchType;
};

export function Link(props: LinkProps) {
  const {to, className, prefetch: _prefetch, ...resOfProps} = props;
  const rootData = useRouteLoaderData<{selectedLocale?: I18nLocale}>('root');
  const selectedLocale = rootData?.selectedLocale;

  let toWithLocale = to;

  if (typeof toWithLocale === 'string' && selectedLocale?.pathPrefix) {
    if (!toWithLocale.toLowerCase().startsWith(selectedLocale.pathPrefix)) {
      toWithLocale = `${selectedLocale.pathPrefix}${to}`;
    }
  }

  if (typeof className === 'function') {
    return (
      <RouterNavLink to={toWithLocale} className={className} {...resOfProps} />
    );
  }

  return (
    <RouterLink to={toWithLocale} className={className} {...resOfProps} />
  );
}


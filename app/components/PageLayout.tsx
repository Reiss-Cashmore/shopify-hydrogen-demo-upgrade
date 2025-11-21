import {useParams, Form, Await, useRouteLoaderData} from 'react-router';
import useWindowScroll from 'react-use/esm/useWindowScroll';
import {Disclosure} from '@headlessui/react';
import {Suspense, useEffect, useMemo} from 'react';
import {CartForm} from '@shopify/hydrogen';

import type {LayoutQuery} from 'storefrontapi.generated';
import {Text, Heading} from '~/components/Text';
import {Link} from '~/components/Link';
import {Cart} from '~/components/Cart';
import {CartLoading} from '~/components/CartLoading';
import {Input} from '~/components/Input';
import {Drawer, useDrawer} from '~/components/Drawer';
import {CountrySelector} from '~/components/CountrySelector';
import {
  IconMenu,
  IconCaret,
  IconLogin,
  IconAccount,
  IconBag,
  IconSearch,
} from '~/components/Icon';
import {
  type EnhancedMenu,
  type ChildEnhancedMenuItem,
} from '~/lib/utils';
import {useIsHydrated} from '~/hooks/useIsHydrated';
import {useCartFetchers} from '~/hooks/useCartFetchers';
import type {RootLoader} from '~/root';

const LAYOUT_CONTAINER = 'w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10';
const ICON_BUTTON_CLASS =
  'group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-primary transition hover:border-white/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40';

type LayoutProps = {
  children: React.ReactNode;
  layout?: LayoutQuery & {
    headerMenu?: EnhancedMenu | null;
    footerMenu?: EnhancedMenu | null;
  };
};

export function PageLayout({children, layout}: LayoutProps) {
  const {headerMenu, footerMenu} = layout || {};
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <a href="#mainContent" className="sr-only">
          Skip to content
        </a>
        {headerMenu && layout?.shop.name && (
          <Header title={layout.shop.name} menu={headerMenu} />
        )}
        <main role="main" id="mainContent" className="flex-grow w-full py-4">
          <div className={`${LAYOUT_CONTAINER} flex flex-col gap-10 pb-16 pt-6`}>
            {children}
          </div>
        </main>
      </div>
      {footerMenu && <Footer menu={footerMenu} />}
    </>
  );
}

function Header({title, menu}: {title: string; menu?: EnhancedMenu}) {
  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  const addToCartFetchers = useCartFetchers(CartForm.ACTIONS.LinesAdd);

  // toggle cart drawer when adding to cart
  useEffect(() => {
    if (isCartOpen || !addToCartFetchers.length) return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      {menu && (
        <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
      )}
      <DesktopHeader
        title={title}
        menu={menu}
        openCart={openCart}
      />
      <MobileHeader
        title={title}
        openCart={openCart}
        openMenu={openMenu}
      />
    </>
  );
}

function CartDrawer({isOpen, onClose}: {isOpen: boolean; onClose: () => void}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!rootData) return null;

  return (
    <Drawer open={isOpen} onClose={onClose} heading="Cart" openFrom="right">
      <div className="grid">
        <Suspense fallback={<CartLoading />}>
          <Await resolve={rootData?.cart}>
            {(cart) => <Cart layout="drawer" onClose={onClose} cart={cart} />}
          </Await>
        </Suspense>
      </div>
    </Drawer>
  );
}

export function MenuDrawer({
  isOpen,
  onClose,
  menu,
}: {
  isOpen: boolean;
  onClose: () => void;
  menu: EnhancedMenu;
}) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Menu">
      <div className="grid">
        <MenuMobileNav menu={menu} onClose={onClose} />
      </div>
    </Drawer>
  );
}

function MenuMobileNav({
  menu,
  onClose,
}: {
  menu: EnhancedMenu;
  onClose: () => void;
}) {
  return (
    <nav className="grid gap-4 p-6 text-primary/80 sm:gap-6 sm:px-10 sm:py-8">
      {/* Top level menu items */}
      {(menu?.items || []).map((item) => (
        <span key={item.id} className="block">
          <Link
            to={item.to}
            target={item.target}
            onClick={onClose}
            className={({isActive}) =>
              `${
                isActive
                  ? 'border-accent/60 text-primary'
                  : 'border-white/10 text-primary/70 hover:border-white/30'
              } flex items-center justify-between rounded-2xl border bg-white/5 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] transition`
            }
          >
            <Text as="span" size="fine" className="tracking-[0.4em]">
              {item.title}
            </Text>
            <span className="text-primary/40">&rsaquo;</span>
          </Link>
        </span>
      ))}
    </nav>
  );
}

function MobileHeader({
  title,
  openCart,
  openMenu,
}: {
  title: string;
  openCart: () => void;
  openMenu: () => void;
}) {
  // useHeaderStyleFix(containerStyle, setContainerStyle, isHome);

  const params = useParams();

  return (
    <header
      role="banner"
      className={`${LAYOUT_CONTAINER} flex lg:hidden flex-col gap-3 rounded-[1.5rem] border border-white/10 bg-surface/80 text-primary shadow-glow backdrop-blur-2xl sticky top-3 z-40`}
    >
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button onClick={openMenu} className={ICON_BUTTON_CLASS} aria-label="Open menu">
            <IconMenu />
          </button>
          <Link
            className="text-[0.75rem] font-semibold uppercase tracking-[0.6em] text-primary/70"
            to="/"
          >
            {title}
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <AccountLink className={ICON_BUTTON_CLASS} />
          <CartCount openCart={openCart} />
        </div>
      </div>
      <Form
        method="get"
        action={params.locale ? `/${params.locale}/search` : '/search'}
        className="flex w-full items-center gap-3"
      >
        <button
          type="submit"
          className={`${ICON_BUTTON_CLASS} h-12 w-12 rounded-full`}
          aria-label="Search"
        >
          <IconSearch />
        </button>
        <Input
          type="search"
          variant="search"
          placeholder="Search the grid..."
          name="q"
          className="flex-1"
        />
      </Form>
    </header>
  );
}

function DesktopHeader({
  menu,
  openCart,
  title,
}: {
  openCart: () => void;
  menu?: EnhancedMenu;
  title: string;
}) {
  const params = useParams();
  const {y} = useWindowScroll();
  return (
    <header
      role="banner"
      className={`${LAYOUT_CONTAINER} hidden lg:flex items-center justify-between rounded-[2rem] border border-white/10 bg-surface/80 px-8 py-5 text-primary shadow-glow backdrop-blur-2xl transition-all duration-300 sticky top-6 z-50 ${
        y > 30 ? 'border-white/30 bg-surface/90' : ''
      }`}
    >
      <div className="flex items-center gap-10">
        <Link
          className="text-sm font-semibold uppercase tracking-[0.6em] text-primary/70"
          to="/"
          prefetch="intent"
        >
          {title}
        </Link>
        <nav className="flex items-center gap-6 text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-primary/50">
          {/* Top level menu items */}
          {(menu?.items || []).map((item) => (
            <Link
              key={item.id}
              to={item.to}
              target={item.target}
              prefetch="intent"
              className={({isActive}) =>
                `${
                  isActive ? 'text-primary' : 'hover:text-primary/80'
                } transition-colors`
              }
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <Form
          method="get"
          action={params.locale ? `/${params.locale}/search` : '/search'}
          className="hidden xl:flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2"
        >
          <Input
            type="search"
            variant="search"
            placeholder="Search the grid..."
            name="q"
            className="w-56 bg-transparent text-sm text-primary placeholder:text-primary/40 focus:border-white/30"
          />
          <button
            type="submit"
            className={ICON_BUTTON_CLASS}
            aria-label="Search"
          >
            <IconSearch />
          </button>
        </Form>
        <AccountLink className={ICON_BUTTON_CLASS} />
        <CartCount openCart={openCart} />
      </div>
    </header>
  );
}

function AccountLink({className}: {className?: string}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  const isLoggedIn = rootData?.isLoggedIn;

  return (
    <Link to="/account" className={className}>
      <Suspense fallback={<IconLogin />}>
        <Await resolve={isLoggedIn} errorElement={<IconLogin />}>
          {(isLoggedIn) => (isLoggedIn ? <IconAccount /> : <IconLogin />)}
        </Await>
      </Suspense>
    </Link>
  );
}

function CartCount({openCart}: {openCart: () => void}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!rootData) return null;

  return (
    <Suspense fallback={<Badge count={0} openCart={openCart} />}>
      <Await resolve={rootData?.cart}>
        {(cart) => (
          <Badge
            openCart={openCart}
            count={cart?.totalQuantity || 0}
          />
        )}
      </Await>
    </Suspense>
  );
}

function Badge({openCart, count}: {count: number; openCart: () => void}) {
  const isHydrated = useIsHydrated();

  const BadgeCounter = useMemo(
    () => (
      <>
        <IconBag className="h-5 w-5" />
        <div className="absolute -right-1.5 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-accent px-1 text-[0.65rem] font-bold text-contrast shadow-glow">
          <span>{count || 0}</span>
        </div>
      </>
    ),
    [count],
  );

  return isHydrated ? (
    <button
      onClick={openCart}
      className={ICON_BUTTON_CLASS}
      aria-label="View cart"
    >
      {BadgeCounter}
    </button>
  ) : (
    <Link
      to="/cart"
      className={ICON_BUTTON_CLASS}
      aria-label="View cart"
    >
      {BadgeCounter}
    </Link>
  );
}

function Footer({menu}: {menu?: EnhancedMenu}) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-white/10 pt-12 text-primary/80">
      <div className={`${LAYOUT_CONTAINER} flex flex-col gap-10 lg:flex-row`}>
        <div className="grid flex-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FooterMenu menu={menu} />
        </div>
        <div className="glass-panel w-full max-w-sm rounded-[1.5rem] border border-white/10 p-6">
          <Heading
            size="copy"
            className="mb-4 text-[0.75rem] uppercase tracking-[0.45em] text-primary/60"
            as="h3"
          >
            Region
          </Heading>
          <CountrySelector />
        </div>
      </div>
      <div
        className={`${LAYOUT_CONTAINER} mt-10 flex flex-wrap items-center justify-between gap-4 pb-10 text-[0.65rem] uppercase tracking-[0.4em] text-primary/40`}
      >
        <span>&copy; {year} / Shopify Hydrogen Experiments</span>
        <span>Built for makers everywhere</span>
      </div>
    </footer>
  );
}

function FooterLink({item}: {item: ChildEnhancedMenuItem}) {
  const linkClasses =
    'text-sm text-primary/60 transition hover:text-primary';

  if (item.to.startsWith('http')) {
    return (
      <a
        href={item.to}
        target={item.target}
        rel="noopener noreferrer"
        className={linkClasses}
      >
        {item.title}
      </a>
    );
  }

  return (
    <Link
      to={item.to}
      target={item.target}
      prefetch="intent"
      className={linkClasses}
    >
      {item.title}
    </Link>
  );
}

function FooterMenu({menu}: {menu?: EnhancedMenu}) {
  const styles = {
    section: 'flex flex-col gap-3',
    nav: 'grid gap-2 text-sm text-primary/70',
  };

  return (
    <>
      {(menu?.items || []).map((item) => (
        <section key={item.id} className={styles.section}>
          <Disclosure>
            {({open}) => (
              <>
                <Disclosure.Button className="w-full text-left md:cursor-default">
                  <Heading size="copy" className="text-sm text-primary">
                    {item.title}
                    {item?.items?.length > 0 && (
                      <span className="md:hidden">
                        <IconCaret direction={open ? 'up' : 'down'} />
                      </span>
                    )}
                  </Heading>
                </Disclosure.Button>
                {item?.items?.length > 0 ? (
                  <div
                    className={`${
                      open ? `max-h-48 h-fit` : `max-h-0 md:max-h-fit`
                    } overflow-hidden transition-all duration-300`}
                  >
                    <Suspense data-comment="This suspense fixes a hydration bug in Disclosure.Panel with static prop">
                      <Disclosure.Panel static>
                        <nav className={styles.nav}>
                          {item.items.map((subItem: ChildEnhancedMenuItem) => (
                            <FooterLink key={subItem.id} item={subItem} />
                          ))}
                        </nav>
                      </Disclosure.Panel>
                    </Suspense>
                  </div>
                ) : null}
              </>
            )}
          </Disclosure>
        </section>
      ))}
    </>
  );
}

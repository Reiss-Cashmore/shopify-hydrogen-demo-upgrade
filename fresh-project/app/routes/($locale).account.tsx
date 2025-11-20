import {
  data as remixData,
  Form,
  NavLink,
  Outlet,
  useLoaderData,
} from 'react-router';
import type {Route} from './+types/account';
import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';
import {PageHeader, Heading, Text} from '~/components/Text';
import {Button} from '~/components/Button';

export function shouldRevalidate() {
  return true;
}

export async function loader({context}: Route.LoaderArgs) {
  const {customerAccount} = context;
  const {data, errors} = await customerAccount.query(CUSTOMER_DETAILS_QUERY, {
    variables: {
      language: customerAccount.i18n.language,
    },
  });

  if (errors?.length || !data?.customer) {
    throw new Error('Customer not found');
  }

  return remixData(
    {customer: data.customer},
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    },
  );
}

export default function AccountLayout() {
  const {customer} = useLoaderData<typeof loader>();

  const heading = customer
    ? customer.firstName
      ? `Welcome, ${customer.firstName}`
      : `Welcome to your account.`
    : 'Account Details';

  return (
    <>
      <PageHeader heading={heading} />
      <AccountMenu />
      <div className="w-full">
        <Outlet context={{customer}} />
      </div>
    </>
  );
}

function AccountMenu() {
  function isActiveStyle({
    isActive,
    isPending,
  }: {
    isActive: boolean;
    isPending: boolean;
  }) {
    return {
      fontWeight: isActive ? 'bold' : undefined,
      color: isPending ? 'grey' : 'black',
    };
  }

  return (
    <nav role="navigation" className="flex gap-4 items-center justify-center py-8 border-b border-primary/10">
      <NavLink to="/account/orders" style={isActiveStyle} className="px-4">
        Orders
      </NavLink>
      <NavLink to="/account/profile" style={isActiveStyle} className="px-4">
        Profile
      </NavLink>
      <NavLink to="/account/addresses" style={isActiveStyle} className="px-4">
        Addresses
      </NavLink>
      <Logout />
    </nav>
  );
}

function Logout() {
  return (
    <Form className="inline-flex" method="POST" action="/account/logout">
      <Button type="submit" variant="secondary">
        Sign out
      </Button>
    </Form>
  );
}

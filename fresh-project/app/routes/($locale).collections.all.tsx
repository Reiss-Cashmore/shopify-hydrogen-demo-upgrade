import {redirect} from 'react-router';
import type {Route} from './+types/collections.all';

export async function loader({params}: Route.LoaderArgs) {
  return redirect(params?.locale ? `/${params.locale}/products` : '/products');
}

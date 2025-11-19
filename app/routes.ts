import {type RouteConfig} from '@react-router/dev/routes';
import {flatRoutes} from '@react-router/fs-routes';
import {hydrogenRoutes} from '@shopify/hydrogen';

export default (async () => {
  const routes = await flatRoutes();
  return hydrogenRoutes(routes);
})() satisfies Promise<RouteConfig>;


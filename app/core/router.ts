import * as pathToRegexp from 'path-to-regexp';
import { View } from 'core/frame';

const routes = [] as Route[];
let defaultPage: Page;

declare interface Route {
  regexp: pathToRegexp.PathRegExp;
  page: Page;
}

declare interface Page {
  view: View<Action>;
}

export type Action = Goto;

interface Goto {
  type: 'GOTO';
  path: string;
}

export const goto = (path: string): Goto => ({type: 'GOTO', path});

export function reset() {
  routes.length = 0;
}

export function path(path: string, page: Page) {
  routes.push({regexp: pathToRegexp(path), page});
  return pathToRegexp.compile(path);
}

export function pathNotFound(page: Page) {
  defaultPage = page;
}

export function view(pathname: string, update: (action: Action) => void) {
  const currentRoute = routes.find((route) =>
    !!route.regexp.exec(pathname));
  return (currentRoute ? currentRoute.page : defaultPage).view(update);
}

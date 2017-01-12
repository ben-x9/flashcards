import createHistory from 'history/createBrowserHistory';
import { VNode } from 'snabbdom/src/vnode';
import * as pathToRegexp from 'path-to-regexp';

const history = createHistory();

const location = history.location;

let routes = [] as Route[];
let _defaultPage: Page;

(<any>window).routes = routes;

declare interface Page {
  show: () => VNode;
}

declare interface Route {
  regexp: pathToRegexp.PathRegExp;
  page: Page;
}

export function reset() {
  routes = [];
}

export function page(path: string, page: Page) {
  routes.push({regexp: pathToRegexp(path), page});
}

export function defaultPage(page: Page) {
  _defaultPage = page;
}

export function show() {
  for (let route of routes) {
    if (route.regexp.exec(location.pathname)) return route.page.show();
  }
  return _defaultPage.show();
}
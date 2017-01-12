import { path, pathNotFound, reset } from 'core/router';
import { Path } from 'core/frame';
import * as notFound from 'pages/not-found';
import * as home from 'pages/home';
import * as login from 'pages/login';
import * as user from 'pages/user';

if (module.hot) module.hot.dispose(() => reset());

pathNotFound(notFound);

export const homePath = path('/', home);
export const loginPath = path('/login', login);

export const userPath: Path<{name: string}> =
  path('/user/:name', user);
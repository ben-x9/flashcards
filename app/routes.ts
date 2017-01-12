import { path, pathNotFound, reset } from 'core/router';
import * as home from 'pages/home';
import * as login from 'pages/login';
import * as notFound from 'pages/not-found';

if (module.hot) module.hot.dispose(() => reset());

export const homePath = path('/', home);
export const loginPath = path('/login', login);

pathNotFound(notFound);
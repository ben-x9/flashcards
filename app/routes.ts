import { page, defaultPage, reset } from 'core/router';
import * as home from 'pages/home';
import * as login from 'pages/login';
import * as notFound from 'pages/not-found';

if (module.hot) module.hot.dispose(() => reset());

page('/', home);
page('/login', login);

defaultPage(notFound);
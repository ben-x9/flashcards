import { page, defaultPage } from 'internals/router';
import * as home from 'pages/home';
import * as login from 'pages/login';
import * as notFound from 'pages/not-found';

page('/', home);
page('/login', login);

defaultPage(notFound);
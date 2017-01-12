import { div } from 'core/html';
import { Update } from 'core/frame';
import { style } from 'typestyle';
import { vertical, verticallySpaced, center, content, margin } from 'csstips';
import { view as button } from 'components/button';
import { Action, goto } from 'core/router';
import { loginPath } from 'routes';

export const view = (update: Update<Action>) =>
  div(style(margin(10), vertical, verticallySpaced(10), center), [
    div(style(content), 'hello world!'),
    button('login', () => update(goto(loginPath()))),
  ]);
import { div } from 'core/html';
import { Update, Goto, goto } from 'core/common';
import { style } from 'typestyle';
import { vertical, verticallySpaced, center, content, margin } from 'csstips';
import { view as button } from 'components/button';
import { loginPath } from 'root';

export type Action = Goto;

export const update = (action: Action) => action;

export const view = (update: Update<Goto>) =>
  div(style(margin(10), vertical, verticallySpaced(10), center), [
    div(style(content), 'hello world!'),
    button('login', () => update(goto(loginPath()))),
  ]);
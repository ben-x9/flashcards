import { div } from 'core/html';
import { Update } from 'core/frame';
import { style } from 'typestyle';
import { vertical, verticallySpaced, center, content, margin } from 'csstips';
import { Action } from 'core/router';

export const view = (update: Update<Action>, name: string) =>
  div(style(margin(10), vertical, verticallySpaced(10), center), [
    div(style(content), `Hello ${name}!`),
  ]);
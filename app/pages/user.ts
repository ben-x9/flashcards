import { div } from 'core/html';
import { style } from 'typestyle';
import { vertical, verticallySpaced, center, content, margin } from 'csstips';

export const view = (name: string) =>
  div(style(margin(10), vertical, verticallySpaced(10), center), [
    div(style(content), `Hello ${name}!`),
  ]);
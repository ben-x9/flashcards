import { h } from 'snabbdom/src/snabbdom';
import { style } from 'typestyle';
import { vertical, verticallySpaced, center, content, margin } from 'csstips';

export const show = () =>
  h(`div.${style(margin(10), vertical, verticallySpaced(10), center)}`, [
    h(`div.${style(content)}`, 'hello world!'),
    h(`div.${style(content)}`, 'hello world 2!'),
  ]);

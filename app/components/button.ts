import { div } from 'core/html';
import { style } from 'typestyle';
import { lightgray } from 'csx';
import { content, padding } from 'csstips';

export const view = (label: string) =>
  div(style(content, padding(10), {
    backgroundColor: lightgray.toString(),
  }), label);
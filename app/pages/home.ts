import { div } from 'core/html';
import { style } from 'typestyle';
import { vertical, verticallySpaced, center, content, margin, padding } from 'csstips';
import { lightgray } from 'csx';

export const show = () =>
  div(style(margin(10), vertical, verticallySpaced(10), center), [
    div(style(content), 'hello world!'),
    div(style(content, padding(10), {
      backgroundColor: lightgray.toString(),
    }), 'login'),
  ]);
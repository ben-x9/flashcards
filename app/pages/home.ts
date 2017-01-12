import { div } from 'core/html';
import { style } from 'typestyle';
import { vertical, verticallySpaced, center, content, margin } from 'csstips';
import { view as button } from 'components/button';

export const view = () =>
  div(style(margin(10), vertical, verticallySpaced(10), center), [
    div(style(content), 'hello world!'),
    button('login'),
  ]);

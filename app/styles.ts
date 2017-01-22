import { style } from 'typestyle';

export const noselect = style({
  // $debugName: 'noselect',
  '-webkit-touch-callout': 'none', /* iOS Safari */
  '-webkit-user-select': 'none', /* Safari */
  '-moz-user-select': 'none', /* Firefox */
  '-ms-user-select': 'none', /* Internet Explorer/Edge */
  userSelect: 'none', /* Non-prefixed version, currently
                        supported by Chrome and Opera */
});
import { div } from 'core/html';
import { style } from 'typestyle';
import { lightgray } from 'csx';
import { content, padding } from 'csstips';

export const view = (label: string, onclick: () => void) =>
  div(style(content, padding(10), {
    backgroundColor: lightgray.toString(),
    cursor: 'pointer',
    $nest: {
      '&:hover': {
        backgroundColor: lightgray.lighten(0.05).toString(),
      },
    },
  }), {on: {click: onclick}}, label);
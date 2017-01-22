import { div } from 'core/html';
import { style, types } from 'typestyle';
import { lightgray } from 'csx';
import { content, padding } from 'csstips';

export const view = (label: string, styles: types.NestedCSSProperties[], onclick: () => void) =>
  div(style(content, padding(10), {
    backgroundColor: lightgray.toString(),
    cursor: 'pointer',
    borderRadius: '3px',
    textAlign: 'center',
    $nest: {
      '&:hover': {
        backgroundColor: lightgray.lighten(0.05).toString(),
      },
    },
  }, ...styles), {on: {click: onclick}}, label);
import { div } from 'core/html';
import { style, types } from 'typestyle';
import { lightgray } from 'csx';
import { content, padding } from 'csstips';
import { noselect } from 'styles';

export const view = (label: string, styles: types.NestedCSSProperties[], onclick: () => void) =>
  div({name: 'button'}, [style(content, padding(10), {
    backgroundColor: lightgray.toString(),
    cursor: 'pointer',
    borderRadius: '3px',
    textAlign: 'center',
    $nest: {
      '&:hover': {
        backgroundColor: lightgray.lighten(0.05).toString(),
      },
    },
  }, ...styles), noselect], {on: {click: onclick}}, label);
import { div } from 'core/html';
import { style } from 'typestyle';
import { padding } from 'csstips';
import { white, black } from 'colors';
import * as Card from 'components/card';
import flippable from 'components/flippable';

export type Store = Card.Store;

const cardClass = style(
  padding(10), {
  color: white,
  backgroundColor: black,
  textAlign: 'center',
  borderRadius: '3px',
});

export const view = (store: Store, flipped: boolean, gap: number, onclick: () => void) =>
  flippable('list-item',
    'vert',
    flipped,
    div(cardClass, {on: {click: onclick}}, store.front),
    div([cardClass, style({right: gap, left: gap})], {on: {click: onclick}}, store.back),
  );
import { div } from 'core/html';
import { style } from 'typestyle';
import { padding, horizontal } from 'csstips';
import { white, black } from 'colors';
import * as Card from 'components/card';
import flippable from 'components/flippable';
import { icon, tick } from 'styles';
import { times } from 'lodash';

export type Store = Card.Store;

const cardClass = style(
  horizontal,
  padding(10), {
  color: white,
  backgroundColor: black,
  textAlign: 'center',
  borderRadius: '3px',
});

const center = style({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
});

const right = style({
  marginLeft: 'auto',
});

const textWithTicks = (text: string, numTicks: number, onclick: () => void,  styleName?: string) =>
  div(styleName ? [cardClass, styleName] : cardClass, {on: {click: onclick}}, [
    div(center, text),
    div([right, style(horizontal, {minHeight: '18px'})], times(numTicks, () =>
      div([style(icon), right], tick))),
  ]);

export const view = (store: Store, flipped: boolean, gap: number, onclick: () => void) =>
  flippable('list-item',
    'vert',
    flipped,
    textWithTicks(store.front, store.score, onclick),
    textWithTicks(store.back, store.score, onclick,
      style({right: gap, left: gap})),
  );
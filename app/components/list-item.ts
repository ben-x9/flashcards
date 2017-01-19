import { div } from 'core/html';
import { style } from 'typestyle';
import { padding } from 'csstips';
import { white, black } from 'colors';
import * as Card from 'components/card';
import * as Flippable from 'components/flippable';

export type Model = Card.Model;

const cardClass = style(
  padding(10), {
  color: white,
  backgroundColor: black,
  textAlign: 'center',
  borderRadius: '3px',
});

export const view = (model: Model, flipped: boolean, gap: number) =>
  Flippable.vert(
    div(cardClass, model.front),
    div([cardClass, style({right: gap, left: gap})], model.back),
    flipped,
  );
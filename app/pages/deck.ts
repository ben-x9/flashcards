import { div } from 'core/html';
import { style } from 'typestyle';
import { vertical, verticallySpaced, centerCenter, padding, width, height } from 'csstips';
import * as Card from 'components/card';

// MODEL

export const model = [] as ReadonlyArray<Card.Model>;
export type Model = typeof model;

export const state = {
  currentCard: 0,
  currentCardIsFlipped: false,
};
export type State = Readonly<typeof state>;

// VIEW

export const view = (model: Model, state: State) => div(
  style(
    padding(10),
    vertical,
    verticallySpaced(10),
    centerCenter,
    width('100%'),
    height('100%')),
  Card.view(model[state.currentCard], state.currentCardIsFlipped),
);

import { div } from 'core/html';
import { style } from 'typestyle';
import { vertical, verticallySpaced, centerCenter, padding, width, height } from 'csstips';
import * as Card from 'components/card';
import { set, Update } from 'core/common';

// MODEL

export const model = [] as ReadonlyArray<Card.Model>;
export type Model = typeof model;

export const state = {
  currentCard: 0,
  currentCardIsFlipped: false,
};
export type State = Readonly<typeof state>;

// UPDATE

interface Flip {
  type: 'FLIP';
}

export type Action = Flip;

export const update = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FLIP':
      return set(state, {
        currentCardIsFlipped: !state.currentCardIsFlipped,
      });
  }
};

// VIEW

export const view = (model: Model, state: State, update: Update<Action>) => div(
  style(
    padding(10),
    vertical,
    verticallySpaced(10),
    centerCenter,
    width('100%'),
    height('100%')),
  {on: {click: () => update({type: 'FLIP'})}},
  Card.view(model[state.currentCard], state.currentCardIsFlipped),
);

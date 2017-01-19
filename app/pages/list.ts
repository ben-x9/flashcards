import { div } from 'core/html';
import { style } from 'typestyle';
import { vertical, verticallySpaced, padding } from 'csstips';
import * as ListItem from 'components/list-item';
import { set, Update } from 'core/common';

// MODEL

export const model = [] as ReadonlyArray<ListItem.Model>;
export type Model = typeof model;

export const state = {
  flippedItem: null as number | null,
};
export type State = typeof state;

// UPDATE

interface Flip {
  type: 'FLIP';
  index: number | null;
}

export type Action = Flip;

export const update = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FLIP':
      return set(state, {
        flippedItem: state.flippedItem === action.index ? null : action.index,
      });
  }
};

// VIEW

const gap = 2;

export const view = (model: Model, state: State, update: Update<Action>) => div(
  style(
    vertical,
    padding(gap),
    verticallySpaced(gap),
  ),
  model.map((item, i) =>
    ListItem.view(item, i === state.flippedItem, gap, () =>
      update({type: 'FLIP', index: i}),
    ),
  ),
);

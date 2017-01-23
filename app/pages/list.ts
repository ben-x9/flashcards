import { div } from 'core/html';
import { style } from 'typestyle';
import { vertical, verticallySpaced, padding, width } from 'csstips';
import * as ListItem from 'components/list-item';
import { set, Update } from 'core/common';
import { toolbarGray } from 'colors';
import { horizontalBar, icon, leftArrow } from 'styles';
import button from 'components/button';
import { studyPath } from 'root';
import { Goto, Effect } from 'core/effects';

// MODEL

export const newStore = [] as ReadonlyArray<ListItem.Store>;
export type Store = typeof newStore;

export const newState = {
  flippedItem: null as number | null,
};
export type State = typeof newState;

// UPDATE

interface Flip {
  type: 'FLIP';
  index: number | null;
}

export type Action = Flip | Goto;

export const update = (state: State, action: Action): [State, Effect] => {
  switch (action.type) {
    case 'FLIP':
      return [set(state, {
        flippedItem: state.flippedItem === action.index ? null : action.index,
      }), null];
    case 'GOTO':
      return [state, action];
  }
};

// VIEW



const gap = 2;

export const view = (store: Store, state: State, update: Update<Action>) =>
  div({name: 'list-view'},
    style(vertical, width('100%')), [
    div({name: 'nav-bar'}, horizontalBar, [
      button(leftArrow + ' Study', () => update({type: 'GOTO', path: studyPath()}), [icon]),
    ]),
    div(
      style(
        vertical,
        padding(gap),
        verticallySpaced(gap),
      ),
      store.slice().reverse().map((item, i) =>
        ListItem.view(item, i === state.flippedItem, gap, () =>
          update({type: 'FLIP', index: i}),
        ),
      ),
    ),
  ]);

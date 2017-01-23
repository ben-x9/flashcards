import { div, input } from 'core/html';
import { style } from 'typestyle';
import { padding, horizontal } from 'csstips';
import { white, black } from 'colors';
import * as Card from 'components/card';
import flippable from 'components/flippable';
import { icon, tick, alignCenter, alignRight } from 'styles';
import { times } from 'lodash';
import { set, Update } from 'core/common';

// MODEL

export type Store = Card.Store;
export const newStore = Card.newStore;


// UPDATE

interface SetCard {
  type: 'SET_CARD';
  face: 'front' | 'back';
  text: string;
}

export type Action = SetCard;

export const update = (card: Store, action: Action): Store => {
  switch (action.type) {
    case 'SET_CARD':
      return set(card, {[action.face]: action.text});
  }
};


// VIEW

const cardClass = style(
  horizontal,
  padding(10), {
  color: white,
  backgroundColor: black,
  textAlign: 'center',
  borderRadius: '3px',
  cursor: 'pointer',
});

const textWithTicks = (text: string, numTicks: number, face: 'front' | 'back', update: Update<Action>, onclick: () => void, editable: boolean, styleName?: string) =>
  div(styleName ? [cardClass, styleName] : cardClass, {on: {click: onclick}}, [
    editable ?
      input([alignCenter, style({
        textAlign: 'center',
        color: white,
        backgroundColor: black,
      })], {
        props: {type: 'text', value: text},
        on: {
          click: (e: Event) => e.stopPropagation(),
          input: (e: Event) => update({
            type: 'SET_CARD',
            face,
            text: (e.target as HTMLInputElement).value,
          }),
          keypress: (e: KeyboardEvent) => {
            // if (e.keyCode === 13)
          },
        },
      }) :
      div(alignCenter, text),
    div([style(alignRight, horizontal, {minHeight: '18px'})],
      times(numTicks, () => div([style(icon)], tick))),
  ]);

export const view = (store: Store, update: Update<Action>, flipped: boolean, gap: number, onclick: () => void, editable = false) =>
  flippable('list-item',
    'vert',
    flipped,
    textWithTicks(store.front, store.score, 'front', update, onclick, editable),
    textWithTicks(store.back, store.score, 'back', update, onclick, editable,
      style({right: gap, left: gap})),
  );
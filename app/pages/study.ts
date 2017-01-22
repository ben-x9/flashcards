import { div } from 'core/html';
import { style } from 'typestyle';
import { vertical, verticallySpaced, horizontal, horizontallySpaced, centerCenter, padding, width, height, flex } from 'csstips';
import * as Card from 'components/card';
import { set, setIndex, Update } from 'core/common';
import * as Button from 'components/button';

// MODEL

export const newStore = [] as ReadonlyArray<Card.Store>;
export type Store = typeof newStore;

export const newState = {
  currentCard: 0,
  flipped: false,
};
export type State = Readonly<typeof newState>;

// UPDATE

interface Flip {
  type: 'FLIP';
}

interface Mark {
  type: 'MARK';
  correct: boolean;
}

export type Action = Flip | Mark;

export const update = (cards: Store, state: State, action: Action): [Store, State] => {
  switch (action.type) {
    case 'FLIP':
      return [cards, set(state, {
        flipped: !state.flipped,
      })];
    case 'MARK':
      const oldCard = cards[state.currentCard];
      const newCard = set(oldCard, {
        score: action.correct ? oldCard.score + 1 : 0,
      });
      const currentCard = state.currentCard;
      const nextCard = currentCard === cards.length - 1 ? 0 : currentCard + 1;
      return [
        setIndex(cards, state.currentCard, newCard),
        set(state, {
          currentCard: nextCard,
          flipped: false,
        }),
      ];
  }
};

// VIEW

export const view = (store: Store, state: State, update: Update<Action>) => div(
  style(vertical, width('100%'), height('100%')), [
    div(
      style(
        padding(10),
        vertical,
        verticallySpaced(10),
        centerCenter,
        width('100%'),
        height('100%')),
      {on: {click: () => update({type: 'FLIP'})}},
      Card.view(store[state.currentCard], state.flipped),
    ),
    div(style(horizontal, horizontallySpaced(3), padding(3)), [
      Button.view('NG', [flex], () => update({type: 'MARK', correct: false})),
      Button.view('OK', [flex], () => update({type: 'MARK', correct: true})),
    ]),
  ],
);

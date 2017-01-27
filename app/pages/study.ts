import { div } from 'core/html';
import { style, keyframes } from 'typestyle';
import { vertical, verticallySpaced, horizontal, horizontallySpaced, centerCenter, padding, width, height, flex, startJustified, content } from 'csstips';
import * as Card from 'components/card';
import { set, setIndex, Update, delIndex } from 'core/common';
import button from 'components/button';
import { Goto, Effect } from 'core/effects';
import { listPath } from 'root';
import { icon, rightArrow, tick, cross, horizontalBar, alignRight, plus } from 'styles';

// MODEL

export const newStore = [] as ReadonlyArray<Card.Store>;
export type Store = typeof newStore;

export const newState = {
  currentCard: 0,
  flipped: false,
  ok: false,
  ng: false,
  editingCard: null as number | null,
  editingCardPrevVal: null as Card.Store | null,
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

interface Advance {
  type: 'ADVANCE';
}

interface AddCard {
  type: 'ADD_CARD';
}

interface EditCancel {
  type: 'EDIT_CANCEL';
}

interface EditComplete {
  type: 'EDIT_COMPLETE';
}

export type Action = Flip | Mark | Advance | Goto | AddCard | EditCancel | EditComplete;

const nextCard = (cards: Store, state: State) =>
  state.currentCard === cards.length - 1 ? 0 : state.currentCard + 1;

export const update = (cards: Store, state: State, action: Action): [Store, State, Effect] => {
  switch (action.type) {
    case 'FLIP':
      return [
        cards,
        set(state, {flipped: !state.flipped}),
        null,
      ];
    case 'MARK':
      const oldCard = cards[state.currentCard];
      const newCard = !state.ng && !state.ok ?
        set(oldCard, {score: action.correct ? oldCard.score + 1 : 0}) :
        oldCard;
      return [
        setIndex(cards, state.currentCard, newCard),
        set(state, {
          ok: action.correct,
          ng: !action.correct,
          flipped: false,
        }),
        null,
      ];
    case 'ADVANCE':
      return [
        state.editingCard ?
          state.editingCardPrevVal ?
            setIndex(cards, state.editingCard, state.editingCardPrevVal) :
            delIndex(cards, state.editingCard) :
          cards,
        set(state, {
          currentCard: state.editingCard === null ?
            nextCard(cards, state) :
            state.currentCard,
          editingCard: null,
          editingCardPrevVal: null,
          flipped: false,
          ok: false,
          ng: false,
        }),
        null,
      ];
    case 'GOTO': return [cards, state, action];
    case 'ADD_CARD': return [
      cards.concat(Card.newStore()),
      set(state, {editingCard: cards.length}),
      null,
    ];
    case 'EDIT_CANCEL':
      if (!state.editingCard) throw new Error;
      return [
        cards,
        set(state, {ng: true}),
        null,
      ];
    case 'EDIT_COMPLETE':
      return [cards, state, null];
  }
};

// VIEW

const abs = style({
  position: 'absolute',
});
const invisible = style({
  visibility: 'hidden',
});
const slideRight = keyframes({
  'to': {
    transform: 'rotateZ(30deg)',
    marginLeft: '120%',
    marginTop: '100px',
   },
});
const slideLeft = keyframes({
  'to': {
    transform: 'rotateZ(-30deg)',
    marginLeft: '-120%',
    marginTop: '100px',
   },
});
const ok = style({
  animationName: slideRight,
  animationDuration: '0.3s',
  animationTimingFunction: 'ease',
});
const ng = style({
  animationName: slideLeft,
  animationDuration: '0.3s',
  animationTimingFunction: 'ease',
});

export const view = (cards: Store, state: State, update: Update<Action>) => div(
  {name: 'study'},
  style(vertical, width('100%'), height('100%')), [
    div({name: 'nav-bar'}, horizontalBar, [
      state.editingCard === null ?
        button(plus, () => update({type: 'ADD_CARD'}), [icon]) : '',
      button('List ' + rightArrow,
        () => update({type: 'GOTO', path: listPath()}),
        [alignRight, icon],
      ),
    ]),
    div({name: 'body'},
      style(
        flex,
        padding(10),
        vertical,
        verticallySpaced(10),
        centerCenter,
        width('100%'),
        height('100%'),
        {overflow: 'hidden'},
      ),
      {on: {click: () => update({type: 'FLIP'})}},
      div(style(vertical),
      [
        Card.view(
          state.editingCard === null ?
            cards[nextCard(cards, state)] :
            cards[state.currentCard],
          false,
          false,
          [abs],
          {class: {[invisible]: !state.ok && !state.ng},
        }),
        Card.view(
          cards[state.currentCard],
          state.flipped,
          state.editingCard === state.currentCard,
          [],
          { on: {animationend: (e: AnimationEvent) =>
              (e.animationName === slideRight ||
               e.animationName === slideLeft) && update({type: 'ADVANCE'})},
            class: {[ok]: state.ok, [ng]: state.ng}},
        ),
      ]),
    ),
    div({name: 'button-bar'}, horizontalBar, state.editingCard === null ? [
      button(cross, () => update({type: 'MARK', correct: false}), [flex, icon]),
      button(tick, () => update({type: 'MARK', correct: true}), [flex, icon]),
    ] : [
      button('CANCEL', () => update({type: 'EDIT_CANCEL'}), [flex, icon]),
      cards[state.editingCard].front && cards[state.editingCard].back &&
        button('OK', () => update({type: 'EDIT_COMPLETE'}), [flex, icon]),
    ]),
  ],
);

import { div } from 'core/html';
import { style } from 'typestyle';
import { vertical, verticallySpaced, centerCenter, padding, width, height } from 'csstips';
import * as Card from 'components/card';

// MODEL

export const model = {
  cards: [
    {front: '食べる', back: 'to eat'},
    {front: '飲む', back: 'to drink'},
    {front: '寝る', back: 'to sleep'},
    {front: '起きる', back: 'to wake up'},
  ] as Card.Model[],
};
export type Model = Readonly<typeof model>;

export const state = {
  currentCard: 0,
  currentCardIsFlipped: true,
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
    height('100%'),
    {backgroundColor: '#ECEFF1'},
  ),
  [Card.view(model.cards[state.currentCard], state.currentCardIsFlipped)]
);

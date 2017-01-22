import { div } from 'core/html';
import { style } from 'typestyle';
import { black, white } from 'csx';
import { vertical, centerJustified, width, height, padding } from 'csstips';
import * as textfit from 'textfit';
import { VNode } from 'snabbdom/VNode';
import * as Flippable from 'components/flippable';
import { set } from 'core/common';

// MODEL

export const newStore = (props: Partial<Card>): Card =>
  set({
    front: '',
    back: '',
    score: 0,
    showNext: new Date(),
  } as Card, props);

interface Card {
  front: string;
  back: string;
  score: number;
  showNext: Date;
}
export type Store = Readonly<Card>;

// VIEW

const cardStyle = style(
  vertical,
  centerJustified,
  width(300),
  height(300),
  padding(15), {
  backgroundColor: black.toString(),
  color: white.toString(),
  borderRadius: 5,
  textAlign: 'center',
  },
);

const hook = {
  insert: (node: VNode) => textfit(<Node>node.elm),
  postpatch: (oldNode: VNode, node: VNode) => textfit(<Node>node.elm),
};

export const view = (store: Store, flipped: boolean) =>
  Flippable.horiz(
    div(cardStyle, {hook}, store.front),
    div(cardStyle, {hook}, store.back),
    flipped,
  );
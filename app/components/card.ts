import { div } from 'core/html';
import { style } from 'typestyle';
import { black, white } from 'csx';
import { vertical, content, centerJustified, width, height, padding } from 'csstips';
import * as textfit from 'textfit';
import { VNode } from 'snabbdom/VNode';
import * as Flippable from 'components/flippable';

// MODEL

export const model = {
  front: '',
  back: '',
};
export type Model = Readonly<typeof model>;

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

export const view = (model: Model, flipped: boolean) =>
  Flippable.horiz(
    div(cardStyle, {hook}, model.front),
    div(cardStyle, {hook}, model.back),
    flipped,
  );
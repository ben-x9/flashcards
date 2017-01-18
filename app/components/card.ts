import { div } from 'core/html';
import { style, types } from 'typestyle';
import { black, white } from 'csx';
import { vertical, content, centerJustified, width, height, padding } from 'csstips';
import * as textfit from 'textfit';
import { VNode } from 'snabbdom/VNode';

// MODEL

export const model = {
  front: '',
  back: '',
};
export type Model = Readonly<typeof model>;

// VIEW

const cardHeight = 300;

const baseStyle = [
  vertical,
  centerJustified,
  width(300),
  height(cardHeight),
  padding(15), {
  backgroundColor: black.toString(),
  color: white.toString(),
  borderRadius: 5,
  textAlign: 'center',
  transition: 'transform 1s',
  backfaceVisibility: 'hidden',
  }] as types.NestedCSSProperties[];

const flippedStyle = [
  {transform: 'rotateY(180deg)'},
];

const baseClass = style(...baseStyle);
const flippedClass = style(...flippedStyle);

const hook = {
  insert: (node: VNode) => textfit(<Node>node.elm),
  postpatch: (oldNode: VNode, node: VNode) => textfit(<Node>node.elm),
};

export const view = (model: Model, flipped: boolean) => div(
  style(vertical, content), [
  div(
    [baseClass, flippedClass],
    {class: {[flippedClass]: flipped}, hook},
    model.front
  ),
  div(
    [baseClass, flippedClass, style({marginTop: `-${cardHeight}px`})],
    {class: {[flippedClass]: !flipped}, hook},
    model.back
  ),
]);
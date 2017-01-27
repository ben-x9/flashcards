import { div, textarea } from 'core/html';
import { style } from 'typestyle';
import { black, white } from 'csx';
import { vertical, content, centerJustified, width, height, padding } from 'csstips';
import * as textfit from 'textfit';
import { VNode, VNodeData } from 'snabbdom/VNode';
import flippable from 'components/flippable';
import { set } from 'core/common';
import { noselect } from 'styles';

// MODEL

export const newStore = (props?: Partial<Card>): Card =>
  set({
    front: '',
    back: '',
    score: 0,
    showNext: new Date(),
  } as Card, props || {});

interface Card {
  front: string;
  back: string;
  score: number;
  showNext: Date;
}
export type Store = Readonly<Card>;

// VIEW

const faceStyle = style(
  vertical,
  content,
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

const faceDivStyle = style({
  cursor: 'pointer',
});

const faceTextAreaStyle = style({
  outline: 'none',
  border: 'none',
  verticalAlign: 'middle',
});

const showFace = (side: 'front' | 'back', store: Store) =>
  div({name: side + '_face'},
    div({name: 'inner'}, [faceStyle, faceDivStyle], {hook: {
      insert: (node: VNode) => textfit(<Node>node.elm),
      postpatch: (oldNode: VNode, node: VNode) => textfit(<Node>node.elm),
    }}, store[side]),
  );

const inputFace = (side: 'front' | 'back', store: Store, flipped: boolean) =>
  textarea({name: side + '_face'}, [faceStyle, faceTextAreaStyle], {
    props: {value: store[side]},
    on: {click: (e: Event) => e.stopPropagation()},
    hook: {
      insert: (vnode) => flipped === (side === 'back') &&
        (vnode.elm as HTMLInputElement).focus(),
      update: (old, vnode) => flipped === (side === 'back') &&
        (vnode.elm as HTMLInputElement).focus(),
    },
  });

export const view = (store: Store, editing: boolean, flipped: boolean, styles: string[] = [], data: VNodeData = {}) =>
  flippable('card',
    'horiz',
    flipped,
    editing ? inputFace('front', store, flipped) : showFace('front', store),
    editing ? inputFace('back', store, flipped) : showFace('back', store),
    styles.concat(noselect),
    data,
  );
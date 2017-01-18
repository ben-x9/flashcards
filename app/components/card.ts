import { div } from 'core/html';
import { style } from 'typestyle';
import { black, white } from 'csx';
import { vertical, centerJustified, width, height, padding } from 'csstips';
import * as textfit from 'textfit';
import { VNode } from 'snabbdom/VNode';
import { defer } from 'lodash';

export const initialModel = {
  front: '',
  back: '',
};
export const initialState = {
  flipped: false,
};
export type Model = Readonly<typeof initialModel>;
export type State = Readonly<typeof initialState>;

export const view = () =>
  div(
    style(vertical, centerJustified, width(300), height(300), padding(15), {
      backgroundColor: black.toString(),
      color: white.toString(),
      borderRadius: 5,
      textAlign: 'center',
    }),
    {
      hook: {
        insert: (node: VNode) =>
          defer(() => textfit(<Node>node.elm)),
        postpatch: (oldNode: VNode, node: VNode) => textfit(<Node>node.elm),
      },
    },
    '食べる',
  );
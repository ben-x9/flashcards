import { div } from 'core/html';
import { style } from 'typestyle';
import { black, white } from 'csx';
import { vertical, centerJustified } from 'csstips';
import * as textfit from 'textfit';
import { VNode } from 'snabbdom/src/VNode';

export const initialModel = {
  front: '',
  back: '',
};

export type Model = Readonly<typeof initialModel>;

export const view = () =>
  div(
    style(vertical, centerJustified, {
      backgroundColor: black.toString(),
      color: white.toString(),
      borderRadius: 5,
      textAlign: 'center',
    }),
    { // textfit requires width, height and padding to be set inline
      style: {
        width: '300px',
        height: '300px',
        padding: '10px',
      },
      hook: {
        insert: (node: VNode) => textfit(node.elm),
        postpatch: (oldNode: VNode, node: VNode) => textfit(node.elm),
      },
    },
    '食べる',
  );
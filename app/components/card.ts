import { div } from 'core/html';
import { style } from 'typestyle';
import { black, white } from 'csx';
import { vertical, centerJustified, width, height, padding } from 'csstips';
import * as textfit from 'textfit';
import { VNode } from 'snabbdom/VNode';

export const initialModel = {
  front: '',
  back: '',
};
export const initialState = {
  flipped: false,
};
export type Model = Readonly<typeof initialModel>;
export type State = Readonly<typeof initialState>;

// `style` needs to be called in advance of `view` for the textfit function to work, which is why I haven't inlined this
const viewStyle = style(
  vertical,
  centerJustified,
  width(300),
  height(300),
  padding(15), {
  backgroundColor: black.toString(),
  color: white.toString(),
  borderRadius: 5,
  textAlign: 'center',
});

export const view = () => div(viewStyle, {hook: {
  insert: (node: VNode) => textfit(<Node>node.elm),
  postpatch: (oldNode: VNode, node: VNode) => textfit(<Node>node.elm),
}}, '食べる');
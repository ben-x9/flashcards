import { div } from 'core/html';
import { style } from 'typestyle';
import { vertical, content } from 'csstips';
import { VNode } from 'snabbdom/VNode';
import { set } from 'core/common';

const baseClass = style({
  transition: 'transform 0.5s',
  backfaceVisibility: 'hidden',
});

const overlap = style({position: 'absolute'});

const flipHorizClass = style({transform: 'rotateY(180deg)'});
const flipVertClass = style({transform: 'rotateX(180deg)'});

const view = (name: string, flipClass: string, flipped: boolean, styleClass: string | string[], front: VNode, back: VNode) =>
  div({name}, [
      style(vertical, content),
      ...(Array.isArray(styleClass) ? styleClass : [styleClass]),
    ], [
      set(front, {
        sel: `${front.sel}.${baseClass}.${flipClass}`,
        data: set(front.data || {}, {
          class: set((front.data || {}).class || {}, {[flipClass]: flipped}),
        }),
      }),
      set(back, {
        sel: `${back.sel}.${baseClass}.${flipClass}.${overlap}`,
        data: set(back.data || {}, {
          class: set((back.data || {}).class || {}, {[flipClass]: !flipped}),
        }),
      }),
  ]);

export const vert = (name: string, flipped: boolean, styleClass: string|string[], front: VNode, back: VNode) =>
  view(name, flipVertClass, flipped, styleClass, front, back);

export const horiz = (name: string, flipped: boolean, style: string|string[], front: VNode, back: VNode) =>
  view(name, flipHorizClass, flipped, style, front, back);

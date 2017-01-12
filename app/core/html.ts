import { h } from 'snabbdom/src/snabbdom';
import { VNode, VNodeData } from 'snabbdom/src/vnode';

interface HyperScriptFunc {
  (className: string, data: VNodeData): VNode;
  (className: string, text: string): VNode;
  (className: string, children: Array<VNode>): VNode;
  (className: string, data: VNodeData, text: string): VNode;
  (className: string, data: VNodeData, children: Array<VNode>): VNode;

  (data: VNodeData): VNode;
  (text: string): VNode;
  (children: Array<VNode>): VNode;
  (data: VNodeData, text: string): VNode;
  (data: VNodeData, children: Array<VNode>): VNode;
}

type A = VNodeData | string | Array<VNode>;
type B = VNodeData | string | Array<VNode>;
type C = string | Array<VNode>;

export const div: HyperScriptFunc = (a?: any, b?: any, c?: any) =>
  typeof a === 'string' && b !== undefined ?
    h(`div.${a}`, b, c) :
    h(`div`, a, b);

import { h } from 'snabbdom';
import { VNode, VNodeData } from 'snabbdom/vnode';

interface HyperScriptFunc {
  (className: string | string[], data: VNodeData): VNode;
  (className: string | string[], text: string): VNode;
  (className: string | string[], children: Array<VNode>): VNode;
  (className: string | string[], data: VNodeData, text: string): VNode;
  (className: string | string[], data: VNodeData, children: Array<VNode>): VNode;

  (data: VNodeData): VNode;
  (text: string): VNode;
  (children: Array<VNode>): VNode;
  (data: VNodeData, text: string): VNode;
  (data: VNodeData, children: Array<VNode>): VNode;
}

type A = VNodeData | string | Array<VNode>;
type B = VNodeData | string | Array<VNode>;
type C = string | Array<VNode>;

export const tag = (tagName: string): HyperScriptFunc =>
  (a?: any, b?: any, c?: any) =>
    typeof (a === 'string' || Array.isArray(a)) && b !== undefined ?
      h(`${tagName}.${Array.isArray(a) ? a.join('.') : a}`, b, c) :
      h(tagName, a, b);

export const div = tag('div');
export const input = tag('input');
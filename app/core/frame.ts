import { VNode } from 'snabbdom/src/vnode';

export type Update<Action> = (update: Action) => void;
export type View<Action> = (update: Update<Action>) => VNode;
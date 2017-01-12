import { VNode } from 'snabbdom/src/vnode';

export type Update<Action> = (update: Action) => void;
export type View<Action> = (update: Update<Action>, ...pathArgs: string[]) => VNode;

export type Path<Data extends Object> = (data: Data) => string;
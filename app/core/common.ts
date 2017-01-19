export type Update<Action> = (update: Action) => void;

export interface Goto {
  type: 'GOTO';
  path: string;
}

export const goto = (path: string) => ({type: 'GOTO', path}) as Goto;

export function set<T extends Object>(object: T, props: Partial<T>): T {
  let unchanged = true;
  for (let prop in props) {
    if (object[prop] !== props[prop]) {
      unchanged = false;
      break;
    }
  }
  // typecasting necessary due to this bug
  // https://github.com/Microsoft/TypeScript/issues/12759
  return unchanged ? object : <T>{...object as Object, ...props as any as Object};
}

export interface ReadonlyArray<T> {
  readonly length: number;
  readonly [n: number]: T;
}
import { path, match, reset } from 'core/router';
import { Effect } from 'core/effects';
import { set } from 'core/common';
import * as NotFound from 'pages/not-found';
import * as Home from 'pages/home';
import * as Login from 'pages/login';
import * as User from 'pages/user';

if (module.hot) module.hot.dispose(() => reset());


// MODEL

export let store = {};

export let state = {
  login: Login.initialState,
};

export type Store = Readonly<typeof store>;
export type State = Readonly<typeof state>;

export function updateModel(newStore: Store, newState: State) {
  store = newStore;
  state = newState;
}

// UPDATE

interface HomeAction {
  type: 'HOME';
  action: Home.Action;
}

interface LoginAction {
  type: 'LOGIN';
  action: Login.Action;
}

export type Action = HomeAction | LoginAction;

export function update(action: Action): [Store, State, Effect] {
  let newStore: Store = store;
  let newState: State = state;
  let effect: Effect = null;
  switch (action.type) {
    case 'HOME':
      effect = Home.update(action.action);
      break;
    case 'LOGIN':
      let login: Login.State;
      [login, effect] = Login.update(state.login, action.action);
      newState = set(state, {login});
      break;
  }
  return [newStore, newState, effect];
};


// VIEW

type Path<Data extends Object> = (data: Data) => string;

export const homePath = path('/', 'home');
export const loginPath = path('/login', 'login');
export const userPath: Path<{name: string}> = path('/user/:name', 'user');

export function view(path: string, update: (action: Action) => void) {
  const route = match(path);
  switch (route.key) {
    case 'home': return Home.view((action: Home.Action) =>
      update({type: 'HOME', action}));
    case 'login': return Login.view(state.login, (action: Home.Action) =>
      update({type: 'LOGIN', action}));
    case 'user': return User.view(route.args[0]);
    default: return NotFound.view();
  }
}
import { path, match, reset } from 'core/router';
import { Effect } from 'core/effects';
import { set } from 'core/common';
import * as NotFound from 'pages/not-found';
import * as Home from 'pages/home';
import * as Login from 'pages/login';
import * as User from 'pages/user';
import * as Study from 'pages/study';
import * as List from 'pages/list';
import { lightGray } from 'colors';

if (module.hot) module.hot.dispose(() => reset());


// MODEL

export const newStore = {
  cards: Study.newStore,
};
export type Store = Readonly<typeof newStore>;

export const state = {
  login: Login.state,
  study: Study.newState,
  list: List.newState,
};
export type State = Readonly<typeof state>;


// UPDATE

interface HomeAction {
  type: 'HOME';
  action: Home.Action;
}

interface LoginAction {
  type: 'LOGIN';
  action: Login.Action;
}

interface ListAction {
  type: 'LIST';
  action: List.Action;
}

interface DeckAction {
  type: 'STUDY';
  action: Study.Action;
}

export type Action = HomeAction | LoginAction | DeckAction | ListAction;

export function update(store: Store, state: State, action: Action): [Store, State, Effect] {
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
    case 'LIST':
      let listState: List.State;
      [listState, effect] = List.update(state.list, action.action);
      newState = set(state, {list: listState});
      break;
    case 'STUDY':
      let cards: Study.Store, studyState: Study.State;
      [cards, studyState, effect] = Study.update(store.cards, state.study, action.action);
      newStore = set(store, {cards});
      newState = set(state, {study: studyState});
      break;
  }
  return [newStore, newState, effect];
};


// VIEW

document.body.style.backgroundColor = lightGray;

type Path<Data extends Object> = (data: Data) => string;

// export const homePath = path('/', 'HOME');
// export const loginPath = path('/login', 'LOGIN');
// export const userPath: Path<{name: string}> = path('/user/:name', 'USER');

export const studyPath = path('/', 'STUDY');
export const listPath = path('/list', 'LIST');

export function view(store: Store, state: State, path: string, update: (action: Action) => void) {
  const route = match(path);
  switch (route.key) {
    case 'HOME':
      return Home.view((action: Home.Action) =>
        update({type: 'HOME', action}));
    case 'LOGIN':
      return Login.view(state.login, (action: Home.Action) =>
        update({type: 'LOGIN', action}));
    case 'USER':
      return User.view(route.args[0]);
    case 'STUDY':
      return Study.view(store.cards, state.study, (action: Study.Action) =>
        update({type: 'STUDY', action}));
    case 'LIST':
      return List.view(store.cards, state.list, (action: List.Action) =>
        update({type: 'LIST', action}));
    default: return NotFound.view();
  }
}
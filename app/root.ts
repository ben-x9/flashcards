import { path, match, reset } from 'core/router';
import { Effect } from 'core/effects';
import { set } from 'core/common';
import * as NotFound from 'pages/not-found';
import * as Home from 'pages/home';
import * as Login from 'pages/login';
import * as User from 'pages/user';
import * as Deck from 'pages/deck';
import * as List from 'pages/list';
import { lightGray } from 'colors';

if (module.hot) module.hot.dispose(() => reset());


// MODEL

export const model = {
  deck: Deck.model,
};
export type Model = Readonly<typeof model>;

export const state = {
  login: Login.state,
  deck: Deck.state,
  list: List.state,
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

export type Action = HomeAction | LoginAction | ListAction;

export function update(model: Model, state: State, action: Action): [Model, State, Effect] {
  let newModel: Model = model;
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
      let listState = List.update(state.list, action.action);
      newState = set(state, {list: listState});
      break;
  }
  return [newModel, newState, effect];
};


// VIEW

document.body.style.backgroundColor = lightGray;

type Path<Data extends Object> = (data: Data) => string;

export const homePath = path('/', 'HOME');
export const loginPath = path('/login', 'LOGIN');
export const userPath: Path<{name: string}> = path('/user/:name', 'USER');

export const deckPath = path('/deck', 'DECK');
export const listPath = path('/list', 'LIST');

export function view(model: Model, state: State, path: string, update: (action: Action) => void) {
  const route = match(path);
  switch (route.key) {
    case 'HOME': return Home.view((action: Home.Action) =>
      update({type: 'HOME', action}));
    case 'LOGIN': return Login.view(state.login, (action: Home.Action) =>
      update({type: 'LOGIN', action}));
    case 'USER': return User.view(route.args[0]);
    case 'DECK': return Deck.view(model.deck, state.deck);
    case 'LIST':
      return List.view(model.deck, state.list, (action: List.Action) =>
        update({type: 'LIST', action}));
    default: return NotFound.view();
  }
}
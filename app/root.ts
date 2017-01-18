import { path, match, reset } from 'core/router';
import { Effect } from 'core/effects';
import { set } from 'core/common';
import * as NotFound from 'pages/not-found';
import * as Home from 'pages/home';
import * as Login from 'pages/login';
import * as User from 'pages/user';
import * as Deck from 'pages/deck';

if (module.hot) module.hot.dispose(() => reset());


// MODEL

export let model = {
  deck: Deck.model,
};
export type Model = Readonly<typeof model>;

export let state = {
  login: Login.state,
  deck: Deck.state,
};
export type State = Readonly<typeof state>;

export function updateModelAndState(newModel: Model, newState: State) {
  model = newModel;
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

export function update(action: Action): [Model, State, Effect] {
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
  }
  return [newModel, newState, effect];
};


// VIEW

type Path<Data extends Object> = (data: Data) => string;

export const homePath = path('/', 'HOME');
export const loginPath = path('/login', 'LOGIN');
export const userPath: Path<{name: string}> = path('/user/:name', 'USER');

export const deckPath = path('/deck', 'DECK');

export function view(path: string, update: (action: Action) => void) {
  const route = match(path);
  switch (route.key) {
    case 'HOME': return Home.view((action: Home.Action) =>
      update({type: 'HOME', action}));
    case 'LOGIN': return Login.view(state.login, (action: Home.Action) =>
      update({type: 'LOGIN', action}));
    case 'USER': return User.view(route.args[0]);
    case 'DECK': return Deck.view(model.deck, state.deck);
    default: return NotFound.view();
  }
}
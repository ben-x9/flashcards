import { init, h } from 'snabbdom';
import { VNode } from 'snabbdom/VNode';
import snabbClass from 'snabbdom/modules/class';
import snabbProps from 'snabbdom/modules/props';
import snabbStyle from 'snabbdom/modules/style';
import snabbEvent from 'snabbdom/modules/eventlisteners';
import snabbAttrs from 'snabbdom/modules/attributes';
const patch = init([ // init patch function with choosen modules
  snabbClass, // makes it easy to toggle classes
  snabbProps, // for setting properties on DOM elements
  snabbStyle, // handles styling on elements with support for animations
  snabbEvent, // attaches event listeners
  snabbAttrs,  // for setting attr on DOM elements
]);

let unlisten: () => void;

// enable webpack hot module replacement
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    unlisten();
  });
}

import * as Root from 'root';
import { defer } from 'lodash';

interface Global extends Window {
  // expose the model and state globally so we can view in the console
  model: Root.Model;
  state: Root.State;
  // make view a global because cannot `x = x || y` when x is a local
  view: VNode | HTMLElement;
}
const global = window as Global;
global.view = global.view || document.getElementById('root') as HTMLElement;

import * as csstips from 'csstips';
csstips.normalize();
csstips.setupPage('#root');

import createHistory from 'history/createBrowserHistory';
const history = createHistory();

interface GoBack {
  type: 'POP';
  path: string;
  state: Root.State;
}

type Action = Root.Action | GoBack;

import { create } from 'jsondiffpatch';
const json = create();

import * as Mock from 'mock-data';

let model = Mock.model; // Root.model;
let state = Root.state;

function update(action: Action) {
  const [newModel, newState, effect] =
    action.type === 'POP' ?
      [ model,
        json.diff(state, action.state) ? action.state : state,
        null] :
      Root.update(model, state, action);
  if (process.env.NODE_ENV === 'development')
    logAction(action, newModel, newState, effect);
  const shouldRefresh = newModel !== model || newState !== state;
  if (action.type !== 'POP' && newState !== state)
    history.replace(history.location.pathname, newState);
  model = newModel;
  state = newState;
  if (process.env.NODE_ENV === 'development') {
    global.model = model;
    global.state = state;
  }
  if (effect && effect.type === 'GOTO') {
    history.push(effect.path, newState);
    refreshView();
  } else if (shouldRefresh || action.type === 'POP') {
    refreshView();
  }
}

import { Effect } from 'core/effects';
import { omit } from 'lodash';

function logAction(action: Action, _model: Root.Model, _state: Root.State, effect: Effect) {
  let actionPath = action.type;
  let actualAction: any = action;
  while (actualAction.action) {
    actualAction = actualAction.action;
    actionPath += ' / ' + actualAction.type;
  }
  actionPath += ' ' + JSON.stringify(omit(actualAction, 'type'));
  let msg = actionPath;
  if (_model !== model)
    msg += '\n-> model ' + JSON.stringify(json.diff(model, _model));
  if (_state !== state)
    msg += '\n-> state ' + JSON.stringify(json.diff(state, _state));
  if (effect)
    msg += '\n-> effect ' + JSON.stringify(effect);
  console.log(msg);
}

defer(refreshView);
unlisten = history.listen((location, action) => {
  if (action === 'POP') {
    update({
      type: 'POP',
      path: location.pathname,
      state: <Root.State>(location.state || state),
    });
  }
});

function refreshView() {
  global.view = patch(global.view,
    h('div#root', Root.view(model, state, history.location.pathname, update)));
}
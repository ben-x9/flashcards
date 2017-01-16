import { init, h } from 'snabbdom/src/snabbdom';
import { VNode } from 'snabbdom/src/VNode';
import snabbClass from 'snabbdom/src/modules/class';
import snabbProps from 'snabbdom/src/modules/props';
import snabbStyle from 'snabbdom/src/modules/style';
import snabbEvent from 'snabbdom/src/modules/eventlisteners';
import snabbAttrs from 'snabbdom/src/modules/attributes';
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

function update(action: Action) {
  const [newModel, newState, effect] =
    action.type === 'POP' ?
      [ Root.model,
        json.diff(Root.state, action.state) ? action.state : Root.state,
        null] :
      Root.update(action);
  if (process.env.NODE_ENV === 'development')
    logAction(action, newModel, newState, effect);
  const shouldRefresh = newModel !== Root.model || newState !== Root.state;
  if (action.type !== 'POP' && newState !== Root.state)
    history.replace(history.location.pathname, newState);
  Root.updateModelAndState(newModel, newState);
  if (process.env.NODE_ENV === 'development') {
    global.model = Root.model;
    global.state = Root.state;
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

function logAction(action: Action, model: Root.Model, state: Root.State, effect: Effect) {
  let actionPath = action.type;
  let actualAction: any = action;
  while (actualAction.action) {
    actualAction = actualAction.action;
    actionPath += ' / ' + actualAction.type;
  }
  actionPath += ' ' + JSON.stringify(omit(actualAction, 'type'));
  let msg = actionPath;
  if (model !== Root.model)
    msg += '\n-> model ' + JSON.stringify(json.diff(Root.model, model));
  if (state !== Root.state)
    msg += '\n-> state ' + JSON.stringify(json.diff(Root.state, state));
  if (effect)
    msg += '\n-> effect ' + JSON.stringify(effect);
  console.log(msg);
}

refreshView();
unlisten = history.listen((location, action) => {
  if (action === 'POP') {
    update({
      type: 'POP',
      path: location.pathname,
      state: <Root.State>(location.state || Root.state),
    });
  }
});

function refreshView() {
  global.view = patch(global.view,
    h('div#root', Root.view(history.location.pathname, update)));
}
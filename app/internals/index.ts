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

interface Root extends Window {
  view: VNode | HTMLElement;
}
const root = window as Root;
root.view = root.view || document.getElementById('root') as HTMLElement;

import * as csstips from 'csstips';
csstips.normalize();
csstips.setupPage('#root');

import * as router from './router';
import 'routes';

root.view = patch(root.view, h('div#root', router.show()));

// enable webpack hot module replacement
if (module.hot) module.hot.accept();
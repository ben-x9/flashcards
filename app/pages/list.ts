import { div } from 'core/html';
import { style } from 'typestyle';
import { vertical, verticallySpaced, padding } from 'csstips';
import * as ListItem from 'components/list-item';
import { set } from 'core/common';

// MODEL

export const model = [] as ReadonlyArray<ListItem.Model>;
export type Model = typeof model;

// VIEW

const gap = 2;

export const view = (model: Model) => div(
  style(
    vertical,
    padding(gap),
    verticallySpaced(gap),
  ),
  model.map((item, i) => ListItem.view(item, true, gap)),
);

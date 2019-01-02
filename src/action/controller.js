import { createActions } from 'redux-actions';

const actionNames = [
  'UP_TRUE',
  'UP_FALSE',
  'DOWN_TRUE',
  'DOWN_FALSE',
  'LEFT_TRUE',
  'LEFT_FALSE',
  'RIGHT_TRUE',
  'RIGHT_FALSE',
  'SPACE_TRUE',
  'SPACE_FALSE',
];

const _BTN_STATE = {};

const actionMap = {};

for (const actionName of actionNames) {
  _BTN_STATE[actionName] = actionName;
  actionMap[actionName] = undefined;
}

export const buttonAction = createActions(actionMap);
export const BTN_STATE = _BTN_STATE;






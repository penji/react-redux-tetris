import { createActions } from 'redux-actions';

export const INVERSE_POSITION = 'INVERSE_POSITION';
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
  INVERSE_POSITION,
];

const actionMap = {};

for (const actionName of actionNames) {
  actionMap[actionName] = undefined;
}

export const buttonAction = createActions(actionMap);






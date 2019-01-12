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
  'INVERSE_POSITION_TRUE',
  'INVERSE_POSITION_FALSE',
  'PAUSE_RESUME_TRUE',
  'PAUSE_RESUME_FALSE',
];

const actionMap = {};

for (const actionName of actionNames) {
  actionMap[actionName] = undefined;
}

export const buttonAction = createActions(actionMap);






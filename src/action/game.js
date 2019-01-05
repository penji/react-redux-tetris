import { createActions } from 'redux-actions';

export const READY = 'READY';
export const GAME_IS_ON = 'GAME_IS_ON';

export const gameAction = createActions({
  [GAME_IS_ON]: undefined,
  [READY]: undefined,
});
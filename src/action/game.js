import { createActions } from 'redux-actions';

export const READY = 'READY';
export const GAME_IS_ON = 'GAME_IS_ON';
export const PAUSED = 'PAUSED';
export const RESUMED = 'RESUMED';
export const GAME_OVER = 'GAME_OVER';

export const gameAction = createActions({
  [READY]: undefined,
  [GAME_IS_ON]: undefined,
  [PAUSED]: undefined,
  [RESUMED]: undefined,
  [GAME_OVER]: highScoreUpdated => ({highScoreUpdated})
});
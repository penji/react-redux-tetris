import { createActions } from 'redux-actions';

export const READY = 'READY';
export const GAME_IS_ON = 'GAME_IS_ON';
export const PAUSED = 'PAUSED';
export const RESUMED = 'RESUMED';
export const GAME_OVER = 'GAME_OVER';
export const LINE = 'LINE';
export const SCORE = 'SCORE';
export const SPEED = 'SPEED';

export const gameAction = createActions({
  [READY]: undefined,
  [GAME_IS_ON]: undefined,
  [PAUSED]: (user = false) => ({user: !!user}),
  [RESUMED]: (user = false) => ({user: !!user}),
  [GAME_OVER]: highScoreUpdated => ({highScoreUpdated}),
  [LINE] : payload => payload,
  [SCORE] : payload => payload,
  [SPEED] : speed => speed,
});
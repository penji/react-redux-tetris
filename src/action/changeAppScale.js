import { createAction } from 'redux-actions';

export const BASE_SIZE = {
  width: 320,
  height: 480,
  ratio: 480/320,
};

export const CHANGE_APP_SCALE = 'CHANGE_APP_SCALE';

export const changeAppScale = createAction(
    CHANGE_APP_SCALE,
    () => ({
      baseWidth: BASE_SIZE.width,
      baseHeight: BASE_SIZE.height,
      baseRatio: BASE_SIZE.ratio,
      windowInnerWidth: window.innerWidth,
      windowInnerHeight: window.innerHeight
    }),
);
import { handleAction } from 'redux-actions';
import { CHANGE_APP_SCALE, changeAppScale as aChangeAppScale } from '../action/changeAppScale';

const reducer = (state, action) => {
  const {
    baseWidth,
    baseHeight,
    baseRatio,
    windowInnerWidth,
    windowInnerHeight,
  } = action.payload;

  const windowRatio = windowInnerHeight / windowInnerWidth;
  let newScale;
  if (windowRatio <= baseRatio) {
    newScale = windowInnerHeight / baseHeight;
  } else {
    newScale = windowInnerWidth / baseWidth;
  }

  return newScale;
};

export const appScale = handleAction(
    CHANGE_APP_SCALE,
    reducer,
    reducer(undefined, aChangeAppScale())
);
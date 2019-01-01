import { combineActions } from 'redux-actions';

export function makeCombineActionType (actionCreators) {
  return combineActions.apply(null, [...Object.values(actionCreators)]);
}
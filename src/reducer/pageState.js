import lifecycle from 'page-lifecycle/dist/lifecycle.es5';
import { handleAction } from 'redux-actions';
import {makeCombineActionType} from '../util/util';
import {
  pageStateAction,
} from '../action/pageState';

const { state } = lifecycle;

export const pageState = handleAction(
    [makeCombineActionType(pageStateAction)],
    (state, action) => ({
      old: state.now,
      now: action.payload,
    }),
    {
      old: state,
      now: state,
    }
);
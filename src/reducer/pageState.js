import lifecycle from 'page-lifecycle/dist/lifecycle.es5';
import { handleAction } from 'redux-actions';
import {
  CHANGE_PAGE_LIFECYCLE_STATE,
} from '../action/changePageLifecycleState';

const { state } = lifecycle;

export const pageState = handleAction(
    CHANGE_PAGE_LIFECYCLE_STATE,
    (state, action) => ({
      old: action.payload.oldState,
      now: action.payload.newState,
    }),
    {
      old: state,
      now: state,
    }
);
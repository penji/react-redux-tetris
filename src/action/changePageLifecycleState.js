import { createAction } from 'redux-actions';

export const CHANGE_PAGE_LIFECYCLE_STATE = 'CHANGE_PAGE_LIFECYCLE_STATE';

export const changePageLifecycleState = createAction(
    CHANGE_PAGE_LIFECYCLE_STATE,
    (newState, oldState) => ({ newState, oldState })
);
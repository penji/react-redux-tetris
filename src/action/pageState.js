import {createActions} from 'redux-actions';

export const PAGE_STATE = {
  ACTIVE: 'ACTIVE',
  PASSIVE: 'PASSIVE',
  HIDDEN: 'HIDDEN',
};

export const ACTIVE = `PAGE_STATE/${PAGE_STATE.ACTIVE}`;
export const PASSIVE = `PAGE_STATE/${PAGE_STATE.PASSIVE}`;
export const HIDDEN = `PAGE_STATE/${PAGE_STATE.HIDDEN}`;

const actionCreator = createActions({
  [ACTIVE]: () => PAGE_STATE.ACTIVE,
  [PASSIVE]: () => PAGE_STATE.PASSIVE,
  [HIDDEN]: () => PAGE_STATE.HIDDEN,
});

export const pageStateAction = actionCreator.pageState;
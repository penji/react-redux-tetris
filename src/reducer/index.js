import { combineReducers } from 'redux';
import { pageState } from './pageState';
import { controller } from './controller';

export default combineReducers({
  pageState,
  controller
});

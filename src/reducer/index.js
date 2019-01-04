import { combineReducers } from 'redux';
import { pageState } from './pageState';
import { controller } from './controller';
import { block } from './block';

export default combineReducers({
  pageState,
  controller,
  block,
});

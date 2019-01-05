import { combineReducers } from 'redux';
import { pageState } from './pageState';
import { controller } from './controller';
import { info } from './info';
import { block } from './block';
import { game } from './game';

export default combineReducers({
  pageState,
  controller,
  info,
  block,
  game,
});

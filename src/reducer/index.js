import { combineReducers } from 'redux';
import { appScale } from './appScale';
import { pageState} from './pageState';

const global = combineReducers({
  appScale,
  pageState,
});

export default combineReducers({
  global
});

import { combineReducers } from 'redux';
import { changeAppScale } from './changeAppScale';
import { changePageLifecycleState} from './changePageLifecycleState';

const global = combineReducers({
  appScale: changeAppScale,
  pageState: changePageLifecycleState,
});

export default combineReducers({
  global
});

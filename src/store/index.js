import { createStore } from 'redux';
import reducer from '../reducer/index';

const store = createStore(
    reducer,
    /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

/*store.subscribe(() => {
  console.dir(store.getState());
});*/

export default store;
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducer/index';
import rootSaga from '../saga/index';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware),
);

const store = createStore(rootReducer, /* preloadedState, */ enhancer);

sagaMiddleware.run(rootSaga);

/*store.subscribe(() => {
  console.dir(store.getState());
});*/

export default store;
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducer/index';
import rootSaga from '../saga/index';
import Storage from "redux-state-save";
import storageAvailable from './storageAvailable';

const lastUpdate = '1547361002348';
let storage;

if (storageAvailable('localStorage')) {
    const localKey = `react-redux-tetris-${lastUpdate}`;

    // 최신 버전의 state가 없으면 기존 state는 삭제함
    if (!localStorage.getItem(localKey)) {
        const keys = Object.keys(localStorage);
        for (let key of keys) {
            if (key.includes('react-redux-tetris-')) {
                localStorage.removeItem(key);
            }
        }
    }

    storage = new Storage();
    storage.setConfig({
        storage_type: 'local_storage',
        local_key: localKey
    });
}


const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

let enhancer;

if (storage) {
    enhancer = composeEnhancers(
        applyMiddleware(sagaMiddleware, storage.saveState()),
    );
} else {
    enhancer = composeEnhancers(
        applyMiddleware(sagaMiddleware),
    );
}

let store = createStore(rootReducer, /* preloadedState, */ enhancer);

if (storage) {
    store = storage.loadState(store);
}

sagaMiddleware.run(rootSaga);

/*store.subscribe(() => {
  console.dir(store.getState());
});*/

export default store;
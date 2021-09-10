import { createStore, compose, applyMiddleware, combineReducers, } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { cacheEnhancer } from 'redux-cache';
import localForage from 'localforage';
import thunk from 'redux-thunk';

/* Local Module */
import rootReducer from './reducers/index';

/* Constant */
const IS_DEV = process.env.NODE_ENV === 'development';
const MIDDLEWARE = [thunk];
const MAIN_PERSIST_CONFIG = {
    key: 'stockbit',
    storage: localForage,
    debug: IS_DEV
}

const reducers = combineReducers({
    stockbit: persistReducer(MAIN_PERSIST_CONFIG, rootReducer)
});
const enhancers = [applyMiddleware(...MIDDLEWARE)];
const PERSIST_CONFIG = { enhancers };
const store = createStore(reducers, undefined, compose(...enhancers, cacheEnhancer()));
const persistor = persistStore(store, PERSIST_CONFIG, () => {
    if (IS_DEV) {
        console.log(store.getState()) // eslint-disable-line no-console
    }
});

/* eslint-disable arrow-body-style */
const configureStore = () => {
    return { persistor, store }
};

export const mainPersistConfig = MAIN_PERSIST_CONFIG;
export default configureStore;
import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from './root-reducer'

const middleWares = process.env.NODE_ENV === 'development' ? [logger] : []

const composedEnhancers = compose(applyMiddleware(...middleWares));

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user'],//list of value names we dont want to persist
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store)
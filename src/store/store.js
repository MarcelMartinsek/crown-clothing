import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from './root-reducer'

import { thunk } from 'redux-thunk'

const middleWares = process.env.NODE_ENV === 'development' ? [logger, thunk] : []

const composedEnhancers = compose(applyMiddleware(...middleWares));

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store)
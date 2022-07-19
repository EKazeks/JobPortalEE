import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // saving in sessionStorage
import rootSaga from './sagas';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
// redux persist
const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['jobsList']
  // whitelist: ['form', 'client']
};

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(sagaMiddleware))(createStore);

const initialState = {};

/* Redux-Persist + Store */

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStoreWithMiddleware(persistedReducer, initialState);

/* Run saga */
sagaMiddleware.run(rootSaga);

export default store;

export const persistor = persistStore(store);

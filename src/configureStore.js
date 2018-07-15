import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducer from './reducers';

const loggerMiddleware = createLogger();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['mySubreddits'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const configureStore = (preloadedState) => {
  const store = createStore(
    persistedReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ),
  );
  const persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;

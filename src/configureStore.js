import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';

const loggerMiddleware = createLogger();

/* eslint-disable no-underscore-dangle */
const configureStore = preloadedState => createStore(
  reducer,
  preloadedState,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
);
/* eslint-enable */

export default configureStore;

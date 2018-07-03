import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import SearchSubreddit from './SearchSubreddit';
// import {fetchSearchSubredditIfValid} from '../actions';

const store = configureStore();
const App = () => (
  <Provider store={store}>
    <SearchSubreddit />
  </Provider>
);

// store.dispatch(fetchSearchSubredditIfValid('reactjs'));

export default App;

import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import SearchSubreddit from './SearchSubreddit';
import Tabs from './Tabs';
import MainPage from './MainPage';

// import {fetchSearchSubredditIfValid} from '../actions';


const store = configureStore();
const App = () => (
  <Provider store={store}>
    <div className="container">
      <SearchSubreddit />
      <Tabs />
      <MainPage />
    </div>
  </Provider>
);

// store.dispatch(fetchSearchSubredditIfValid('reactjs'));

export default App;

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from '../configureStore';
import SearchSubreddit from './SearchSubreddit';
import Tabs from './Tabs';
import MainPage from './MainPage';

const { store, persistor } = configureStore();
const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <div className="container">
        <SearchSubreddit />
        <Tabs />
        <MainPage />
      </div>
    </PersistGate>
  </Provider>
);

export default App;

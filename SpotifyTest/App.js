/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { store } from './src/redux/store/store';

import EntryScreen from './src/screens/Entry/entryScreen';

class App extends Component {
  render() {
    console.log('App')
    return (
      <Provider store={store}>
        <EntryScreen />
      </Provider>
    );
  }
}
export default App;

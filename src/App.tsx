/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import './gesture-handler.native';

import * as React from 'react';
import store from './redux/store';
import { Provider } from 'react-redux';

import { RootNavigation } from './navigation/RootNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import * as React from 'react';
import './src/gesture-handler.native';

import { NavigationContainer } from '@react-navigation/native';

import { RootNavigation, RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
      <RootNavigation />
  );
}

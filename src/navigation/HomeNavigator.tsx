import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Listing } from '../screens/Listing';
import { Cart } from '../screens/Cart';
import { GameIntro } from '../screens/GameIntro';
import { Image } from 'react-native';

export const HomeNavigator = createBottomTabNavigator({
  initialRouteName: 'Listing',
  screens: {
    Listing: {
      screen: Listing,
      options: {
        tabBarIcon: ({ focused, size, color }) => (
          <Image
            source={require('../../assets/images/home.png')}
            style={{ width: size, height: size }}
            tintColor={focused ? color : '#757575'}
          />
        ),
      },
    },
    GameIntro: {
      screen: GameIntro,
      options: {
        tabBarIcon: ({ focused, color, size }) => (
          <Image
            source={require('../../assets/images/console.png')}
            style={{ width: size, height: size }}
            tintColor={focused ? color : '#757575'}
          />
        ),
      },
    },
    Cart: {
      screen: Cart,
      options: {
        tabBarIcon: ({ focused, color, size }) => (
          <Image
            source={require('../../assets/images/bag.png')}
            style={{ width: size, height: size }}
            tintColor={focused ? color : '#757575'}
          />
        ),
      },
    },
  },
  screenOptions: {
    headerShown: false,
    tabBarActiveTintColor: 'tomato',
  },
});

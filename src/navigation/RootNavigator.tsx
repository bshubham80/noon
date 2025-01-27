import { createStackNavigator } from '@react-navigation/stack';
import { HomeNavigator } from './HomeNavigator';
import { ProductDetail } from '../screens/ProductDetail';
import { createStaticNavigation } from '@react-navigation/native';
import Game from '../screens/Game';

export const RootNavigator = createStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: {
      screen: HomeNavigator,
      options: {
        headerShown: false,
      },
    },
    ProductDetail,
    Game: {
      screen: Game,
      options: {
        headerShown: false,
        presentation: 'modal',
      },
    },
  },
});

export const RootNavigation = createStaticNavigation(RootNavigator);


import { createStackNavigator } from '@react-navigation/stack';
import { HomeNavigator } from './HomeNavigator';
import { ProductDetail } from '../screens/ProductDetail';
import { createStaticNavigation } from '@react-navigation/native';

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
  },
});

export const RootNavigation = createStaticNavigation(RootNavigator);

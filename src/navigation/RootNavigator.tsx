
import { createStackNavigator } from '@react-navigation/stack';
import { HomeNavigator } from './HomeNavigator';
import { ProductDetail } from '../screens/ProductDetail';
import { createStaticNavigation } from '@react-navigation/native';

export const RootNavigator = createStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: HomeNavigator,
    ProductDetail,
  },
	screenOptions: {
		header: undefined,
	},
});

export const RootNavigation = createStaticNavigation(RootNavigator);

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Listing } from '../screens/Listing';
import { ProductDetail } from '../screens/ProductDetail';
import { Cart } from '../screens/Cart';

export const HomeNavigator = createBottomTabNavigator({
  initialRouteName: 'Listing',
  screens: {
    Listing,
    // ProductDetail,
		Cart,
  },
  screenOptions: {
    headerShown: false,
  },
});

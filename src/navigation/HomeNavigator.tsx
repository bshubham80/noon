import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Listing } from '../screens/Listing';
import { Cart } from '../screens/Cart';
import { GameIntro } from '../screens/GameIntro';

export const HomeNavigator = createBottomTabNavigator({
  initialRouteName: 'Listing',
  screens: {
    Listing,
    GameIntro,
    Cart,
  },
  screenOptions: {
    headerShown: false,
  },
});

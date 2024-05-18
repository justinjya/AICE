import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import FavoritesStack from './FavoritesStack';
import MealPlanStack from './MealPlanStack';
import AccountStack from './AccountStack';
import BottomNavBar from 'components/BottomNavBar';

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  return (
    <Tab.Navigator tabBar={props => <BottomNavBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Favorites" component={FavoritesStack} />
      <Tab.Screen name="MealPlan" component={MealPlanStack} />
      <Tab.Screen name="Account" component={AccountStack} />
    </Tab.Navigator>
  );
};
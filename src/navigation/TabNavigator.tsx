import { StyleSheet, View, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { BottomNavBar, BOTTOM_NAV_BAR_HEIGHT } from '@components';
import HomeStack from './HomeStack';
import FavoritesStack from './FavoritesStack';
import MealPlanStack from './MealPlanStack';
import AccountStack from './AccountStack';

const Tab = createBottomTabNavigator();

function SafeAreaWrapper({ children }: { children: React.ReactNode }) {
  return <View style={styles.safeArea}>{children}</View>;
}

export default function TabNavigator() {
  return (
    <Tab.Navigator tabBar={props => <BottomNavBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home">
        {() => <SafeAreaWrapper><HomeStack /></SafeAreaWrapper>}
      </Tab.Screen>
      <Tab.Screen name="Favorites">
        {() => <SafeAreaWrapper><FavoritesStack /></SafeAreaWrapper>}
      </Tab.Screen>
      <Tab.Screen name="MealPlan">
        {() => <SafeAreaWrapper><MealPlanStack /></SafeAreaWrapper>}
      </Tab.Screen>
      <Tab.Screen name="Account">
        {() => <SafeAreaWrapper><AccountStack /></SafeAreaWrapper>}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  safeArea: {
    height: screenHeight - BOTTOM_NAV_BAR_HEIGHT,
  },
});
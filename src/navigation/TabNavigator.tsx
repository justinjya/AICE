import { View, Dimensions, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Spacings } from '@values';
import { BottomNavBar, ANDROID_BOTTOM_NAV_BAR_HEIGHT, IOS_BOTTOM_NAV_BAR_HEIGHT } from '@components';
import HomeStack from './HomeStack';
import FavoritesStack from './FavoritesStack';
import MealPlanStack from './MealPlanStack';
import AccountStack from './AccountStack';

const Tab = createBottomTabNavigator();

const screenHeight = Dimensions.get('window').height;

function SafeAreaWrapper({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ height: Platform.OS === 'android' ? screenHeight - ANDROID_BOTTOM_NAV_BAR_HEIGHT + Spacings.xl : screenHeight - IOS_BOTTOM_NAV_BAR_HEIGHT }}>
      {children}
    </View>
  );
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
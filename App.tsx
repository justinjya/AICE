import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '@values';
import { BottomNavBar, FiltersPopUp, RecipeDetailsPopUp } from 'components';
import {
  HomeScreen,
  FavoritesScreen,
  MealPlanMonthScreen,
  MealPlanWeekScreen,
  RecipeDetailsScreen,
  AccountDetailsScreen,
  NotLoggedInAccountDetailsScreen,
  RegisterScreen,
  LoginScreen 
} from 'screens';

const Stack = createNativeStackNavigator();

const screenOptions = { headerShown: false };

const HomeStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="HS_Home" component={HomeScreen} />
    <Stack.Screen name="HS_Details" component={RecipeDetailsScreen} />
  </Stack.Navigator>
);

const FavoritesStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="FS_Favorites" component={FavoritesScreen} />
    <Stack.Screen name="FS_Details" component={RecipeDetailsScreen} />
  </Stack.Navigator>
);

const MealPlanStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="MS_MealPlanMonth" component={MealPlanMonthScreen} />
    <Stack.Screen name="MS_MealPlanWeek" component={MealPlanWeekScreen} />
    <Stack.Screen name="MS_Details" component={RecipeDetailsScreen} />
  </Stack.Navigator>
);

const AccountStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="AS_NotLoggedInAccountDetails" component={NotLoggedInAccountDetailsScreen} />
    <Stack.Screen name="AS_Login" component={LoginScreen} />
    <Stack.Screen name="AS_Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator tabBar={props => <BottomNavBar {...props} />} screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Favorites" component={FavoritesStack} />
          <Tab.Screen name="MealPlan" component={MealPlanStack} />
          <Tab.Screen name="Account" component={AccountStack} />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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

export default function App() {
  return ( 
    <SafeAreaProvider style={styles.container}>
      {/* <HomeScreen /> */}
      {/* <RecipeDetailsScreen /> */}
      {/* <FavoritesScreen /> */}
      {/* <MealPlanMonthScreen /> */}
      {/* <MealPlanWeekScreen /> */}
      {/* <AccountDetailsScreen /> */}
      {/* <NotLoggedInAccountDetailsScreen /> */}
      {/* <RegisterScreen /> */}
      {/* <LoginScreen /> */}
      {/* <FiltersPopUp /> */}
      {/* <RecipeDetailsPopUp /> */}
      <BottomNavBar />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

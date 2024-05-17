import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors, Spacings } from '@values';
import HomeScreen from 'HomeScreen';
import FavoritesScreen from 'FavoritesScreen';
import MealPlanMonthScreen from 'MealPlanMonthScreen';
import MealPlanWeekScreen from 'MealPlanWeekScreen';
import RecipeDetailsScreen from 'RecipeDetailsScreen';
import AccountDetailsScreen from 'AccountDetailsScreen';
import NotLoggedInAccountDetailsScreen from 'NotLoggedInAccountDetailsScreen';
import RegisterPage from 'RegisterScreen';
import LoginPage from 'LoginScreen';
import FiltersPopUp from 'FiltersPopUp';

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
      {/* <RegisterPage /> */}
      {/* <LoginPage /> */}
      <FiltersPopUp />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray_100,
  },
});

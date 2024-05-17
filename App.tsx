import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Colors } from '@values';
import RegisterPage from './RegisterPage';
import HomeScreen from 'HomeScreen';
import FavoritesScreen from 'FavoritesScreen';
import MealPlanMonthScreen from 'MealPlanMonthScreen';
import MealPlanWeekScreen from 'MealPlanWeekScreen';

export default function App() {
  return ( 
    <SafeAreaView style={styles.container}>
      {/* <RegisterPage /> */}
      {/* <HomeScreen /> */}
      {/* {/* <FavoritesScreen /> */}
      {/* <MealPlanMonthScreen /> */}
      <MealPlanWeekScreen />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

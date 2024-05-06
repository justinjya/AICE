import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Colors } from '@values';
import RegisterPage from './RegisterPage';
import RecipeDetailsScreen from './RecipeDetailsScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <RegisterPage /> */}
      <RecipeDetailsScreen />
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

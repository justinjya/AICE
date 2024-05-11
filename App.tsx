import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors, Spacings } from '@values';
import RegisterPage from './RegisterPage';
import RecipeDetailsScreen from './RecipeDetailsScreen';

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      {/* <RegisterPage /> */}
      <RecipeDetailsScreen />
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

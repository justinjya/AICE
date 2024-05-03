import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Colors } from '@values';
import RegisterPage from './RegisterPage';
import LoginPage from 'LoginPage';
import RecipeDetailsPopup from 'RecipeDetailsPopup';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <LoginPage /> */}
      <RecipeDetailsPopup />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray_100,
  },
});

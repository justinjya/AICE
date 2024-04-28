import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import RegisterPage from './RegisterPage';
import { Colors } from './Values';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <RegisterPage />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

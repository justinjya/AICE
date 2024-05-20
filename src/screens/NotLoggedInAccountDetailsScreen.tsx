import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Sizes, Spacings } from "@values";
import { Button } from '@components';
import { NavigationProp, ParamListBase } from "@react-navigation/native";

interface NotLoggedInAccountDetailsScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

export default function NotLoggedInAccountDetailsScreen({ navigation }: NotLoggedInAccountDetailsScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Account Details</Text>
      <Text style={[styles.text, { width: '80%', marginBottom: Spacings.l }]}>You are currently not signed into any account.</Text>
      <Button
        title='Create an account'
        style={{ marginBottom: Spacings.xs }}
        textStyle={[styles.text, { textDecorationLine: 'underline' }]}
        onPress={() => navigation.navigate('Register')}
      />
      <Button
        title='Login to an existing account'
        textStyle={[styles.text, { textDecorationLine: 'underline' }]}
        onPress={() => navigation.navigate('Login')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: Spacings.m,
  },
  title: {
    fontSize: Sizes.h1,
    marginBottom: Spacings.l,
  },
  text: {
    fontSize: Sizes.h3,
  }
});
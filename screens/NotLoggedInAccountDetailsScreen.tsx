import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Sizes, Spacings } from "@values";
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
  detailsContainer: {
    flexDirection: 'column',
    marginBottom: Spacings.m,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    height: 42,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    borderColor: Colors.orange_600,
    borderWidth: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacings.xxl,
  },
  buttonText: {
    fontSize: Sizes.h3,
    color: Colors.onPrimary
  },
  text: {
    fontSize: Sizes.h3,
  }
});
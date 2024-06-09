import { Text, StyleSheet, AppState } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useState } from 'react';
import { InputField, Button } from '@components';
import { Colors, Sizes, Spacings } from "@values";
import { supabase, signInWithEmail } from "@utils";

interface LoginScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCredentialsFalse, setIsCredentialsFalse] = useState(false);

  const isEmailValid = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };
  
  const isButtonDisabled = !email || !isEmailValid(email) || password.length < 5;
  
  const handleLogin = async () => {
    try {
      await signInWithEmail(email, password)
      navigation.navigate('AS_AccountDetails');
    } catch (error) {
      setIsCredentialsFalse(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title='Cancel'
        style={styles.cancelButton}
        onPress={() => navigation.goBack()} />
      <Text style={styles.title}>Login</Text>
      <InputField
        title='Email'
        placeholder='Email' 
        inputProps={{ inputText: email, setInputText: setEmail }} 
        style={{ marginBottom: Spacings.m }}
        isError={isCredentialsFalse}
        errorMessage={"Invalid credentials"} />
      <InputField
        title='Password'
        placeholder='Password' 
        inputProps={{ inputText: password, setInputText: setPassword }} 
        style={{ marginBottom: Spacings.xl }}
        isError={isCredentialsFalse}
        errorMessage={"Invalid credentials"}
        password={true} />
      <Button
        title='Login'
        style={[styles.loginButton, { opacity: isButtonDisabled ? 0.5 : 1 }]}
        textStyle={styles.loginText}
        onPress={handleLogin}
        disabled={isButtonDisabled} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacings.m,
  },
  title: {
    fontSize: Sizes.h1,
    marginBottom: Spacings.xxl,
  },
  cancelButton: {
    fontSize: Sizes.h3,
    alignSelf: 'flex-start',
    marginBottom: Spacings.m
  },
  loginButton: {
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
  loginText: {
    fontSize: Sizes.h3,
    color: Colors.onPrimary
  }
});

import { SafeAreaView, Text, StyleSheet, Platform, StatusBar as StatusBarAPI } from "react-native";
import { StatusBar } from "expo-status-bar";
import { CredentialInput, Button } from '@components';
import { Colors, Sizes, Spacings } from "@values";
import React, { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordFalse, setIsPasswordFalse] = useState(false);
  const [isEmailFalse, setIsEmailFalse] = useState(false);

  const isEmailValid = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };


  const isButtonDisabled = !email || !isEmailValid(email) || password.length < 5;
  

  const handleLogin = () => {
    if (email !== 'anjaniibrahimm@gmail.com') {
      setIsEmailFalse(true);
    } else {
      setIsEmailFalse(false);
    }

    if (password !== 'anjani') {
      setIsPasswordFalse(true);
    } else {
      setIsPasswordFalse(false);
      console.log('Login');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: Platform.OS === 'android' ? StatusBarAPI.currentHeight : 0 }]}>
      <Button
        title='Cancel'
        style={styles.cancelButton}
        onPress={() => {}}
        disabled={false} />
      <Text style={styles.title}>Login</Text>
      <CredentialInput
        title='Email'
        placeholder='Email' 
        inputProps={{ inputText: email, setInputText: setEmail }} 
        style={{ marginBottom: Spacings.m }}
        isError={isEmailFalse}
        errorMessage={isEmailFalse ? "Email is invalid" : ""} />
      <CredentialInput
        title='Password'
        placeholder='Password' 
        inputProps={{ inputText: password, setInputText: setPassword }} 
        style={{ marginBottom: Spacings.xl }}
        isError={isPasswordFalse}
        errorMessage={isPasswordFalse ? "Password is invalid" : ""}
        password={true} />
      <Button
        title='Login'
        style={styles.createAccountButton}
        textStyle={styles.createAccountButtonText}
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
  createAccountButton: {
    height: 42,
    backgroundColor: Colors.primary,
    opacity: 0.5,
    borderRadius: 10,
    borderColor: Colors.orange_600,
    borderWidth: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacings.xxl,
  },
  createAccountButtonText: {
    fontSize: Sizes.h3,
    color: Colors.onPrimary
  }
});

import { SafeAreaView, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { CredentialInput, Button } from '@components';
import { Colors, Sizes, Spacings } from "@values";
import React, { useState } from 'react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const isButtonDisabled = !name || !isEmailValid(email) || password.length < 5;

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title='Cancel'
        style={styles.cancelButton}
        onPress={() => {}}
        disabled={false} />
      <Text style={styles.title}>Create an Account</Text>
      <CredentialInput
        title='Name'
        placeholder='Name' 
        inputProps={{ inputText: name, setInputText: setName }} 
        style={{ marginBottom: Spacings.m }} />
      <CredentialInput
        title='Email'
        placeholder='Email' 
        inputProps={{ inputText: email, setInputText: setEmail }} 
        style={{ marginBottom: Spacings.m }} />
      <CredentialInput
        title='Password'
        placeholder='Password' 
        inputProps={{ inputText: password, setInputText: setPassword }} 
        style={{ marginBottom: Spacings.xl }}
        password={true} />
      <Button
        title='Create Account'
        style={[styles.createAccountButton, { opacity: isButtonDisabled ? 0.5 : 1 }]}
        textStyle={styles.createAccountButtonText}
        onPress={() => {console.log('Create Account')}}
        disabled={isButtonDisabled} />
      <StatusBar style="auto" />
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
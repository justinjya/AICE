import { SafeAreaView, Text, StyleSheet, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Colors, Sizes, Spacings } from "./Values";
import React, { useState } from 'react';
import CredentialInput from "./components/CredentialInput";

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
      <Pressable>
        <Text style={styles.cancelButton}>Cancel</Text>
      </Pressable>
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
      <Pressable 
        style={[styles.createAccountButton, { opacity: isButtonDisabled ? 0.5 : 1 }]} 
        onPress={() => console.log('Create Account Pressed')}
        disabled={isButtonDisabled} >
        <Text style={styles.createAccountButtonText}>Create Account</Text>
      </Pressable>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: Sizes.h1,
    marginBottom: Spacings.xxl,
  },
  cancelButton: {
    fontSize: Sizes.h3,
    marginBottom: Spacings.m
  },
  createAccountButton: {
    width: 213,
    height: 42,
    backgroundColor: Colors.primary,
    opacity: 0.5,
    borderRadius: 10,
    borderColor: Colors.orange_600,
    borderWidth: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacings.m,
  },
  createAccountButtonText: {
    fontSize: Sizes.h3,
    color: Colors.onPrimary
  }
});
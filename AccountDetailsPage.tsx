import { SafeAreaView, Text, StyleSheet, View, TextInput, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { CredentialInput, Button } from '@components';
import { Colors, Sizes, Spacings } from "@values";
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';

export default function AccountDetailsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const isEmailValid = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const [name, setName] = useState('John Doe');
  const [isEditingName, setIsEditingName] = useState(false);

  const [email, setEmail] = useState('john.doe@example.com');
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const [password, setPassword] = useState('password');
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const isEditingAnyField = isEditingName || isEditingEmail || isEditingPassword;

  if (isLoggedIn) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Account Details</Text>
      <View style={styles.detailContainer}>
        {isEditingName ? (
          <CredentialInput
            title="Name"
            placeholder='Name' 
            inputProps={{ inputText: name, setInputText: setName }} 
            style={{ marginBottom: Spacings.s }} />
        ) : (
          <>
            <Text style={styles.detailTitle}>Name</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detail}>{name}</Text>
              <Pressable onPress={() => setIsEditingName(true)}>
                <Feather name="edit" size={20} color={Colors.secondary} style={{ marginRight: Spacings.l }} />
              </Pressable>
            </View>
          </>
        )}
      </View>
      <View style={styles.detailContainer}>
      {isEditingEmail ? (
          <CredentialInput
            title="Email"
            placeholder='Email' 
            inputProps={{ inputText: email, setInputText: setEmail }} 
            style={{ marginBottom: Spacings.s }} />
        ) : (
          <>
            <Text style={styles.detailTitle}>Email</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detail}>{email}</Text>
              <Pressable onPress={() => setIsEditingEmail(true)}>
                <Feather name="edit" size={20} color={Colors.secondary} style={{ marginRight: Spacings.l }} />
              </Pressable>
            </View>
          </>
        )}
      </View>
      <View style={styles.detailContainer}>
        {isEditingPassword ? (
            <CredentialInput password={true}
              title="Password"
              placeholder='Password' 
              inputProps={{ inputText: password, setInputText: setPassword }} 
              style={{ marginBottom: Spacings.s }} />
          ) : (
            <>
              <Text style={styles.detailTitle}>Password</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detail}>{'•'.repeat(password.length)}</Text>
                <Pressable onPress={() => setIsEditingPassword(true)}>
                  <Feather name="edit" size={20} color={Colors.secondary} style={{ marginRight: Spacings.l }} />
                </Pressable>
              </View>
            </>
          )}
      </View>
      {isEditingAnyField ? (
      <View style={styles.buttonContainer}>
        <Button
          title='Cancel'
          style={[styles.button, { opacity: 0.5, marginRight: Spacings.s }]}
          textStyle={styles.buttonText}
          onPress={() => {
            setIsEditingName(false);
            setIsEditingEmail(false);
            setIsEditingPassword(false);
          }}
        />
        <Button
          title='Save'
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={() => {
            setIsEditingName(false);
            setIsEditingEmail(false);
            setIsEditingPassword(false);
          }}
        />
      </View>
    ) : (
      <Button
        title='Logout'
        style={styles.logoutButton}
        textStyle={styles.logoutButtonText}
      />
    )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );}
  else {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Account Details</Text>
      <Text style={{ width: '80%', fontSize: Sizes.h3 , marginBottom: Spacings.l}}>You are currently not signed into any account.</Text>
      <Button
        title='Create an account'
        style={{ alignSelf: 'flex-start', marginBottom: Spacings.s }}
        textStyle={{ fontSize: Sizes.l, textDecorationLine: 'underline' }}
      />
      <Button
        title='Login to an existing account'
        style={{ alignSelf: 'flex-start', marginBottom: Spacings.s }}
        textStyle={{ fontSize: Sizes.l, textDecorationLine: 'underline' }}
      />
    </SafeAreaView>
  );
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacings.m,
  },
  title: {
    fontSize: Sizes.h1,
    marginBottom: Spacings.xxl,
  },
  detailContainer: {
    flexDirection: 'column',
    marginBottom: Spacings.m,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: Spacings.m,
    justifyContent: 'space-between',
  },
  detailTitle: {
    marginRight: Spacings.s,
    marginBottom: Spacings.m,
    fontSize: Sizes.h3,
  },
  detail: {
    marginRight: Spacings.s,
    fontSize: Sizes.h2,
  },
  logoutButton: {
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
  logoutButtonText: {
    fontSize: Sizes.h3,
    color: Colors.onPrimary
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
});
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { Colors, Sizes, Spacings } from "@values";
import { Button, EditableField } from '@components';

export default function AccountDetailsScreen() {
  const isEmailValid = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const [name, setName] = useState('John Doe');
  const [tempName, setTempName] = useState(name);
  const [isEditingName, setIsEditingName] = useState(false);

  const [email, setEmail] = useState('john.doe@example.com');
  const [tempEmail, setTempEmail] = useState(email);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const [password, setPassword] = useState('password');
  const [tempPassword, setTempPassword] = useState(password);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const isEditingAnyField = isEditingName || isEditingEmail || isEditingPassword;
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Account Details</Text>
      <View style={styles.detailsContainer}>
        <EditableField
          title="Name"
          attribute={name}
          isEditingProps={{ isEditing: isEditingName, setIsEditing: setIsEditingName }}
          tempValueProps={{ tempValue: tempName, setTempValue: setTempName }}
          style={{ marginBottom: Spacings.l }}
          inputFieldStyle={{ marginBottom: Spacings.m_s }}
        />
        <EditableField
          title="Email"
          attribute={email}
          isEditingProps={{ isEditing: isEditingEmail, setIsEditing: setIsEditingEmail }}
          tempValueProps={{ tempValue: tempEmail, setTempValue: setTempEmail }}
          style={{ marginBottom: Spacings.l }}
          inputFieldStyle={{ marginBottom: Spacings.m_s }}
        />
        <EditableField
          title="Password"
          attribute={password}
          password={true}
          isEditingProps={{ isEditing: isEditingPassword, setIsEditing: setIsEditingPassword }}
          tempValueProps={{ tempValue: tempPassword, setTempValue: setTempPassword }}
          style={{ marginBottom: Spacings.l }}
          inputFieldStyle={{ marginBottom: Spacings.m_s }}
        />
      </View>
      {isEditingAnyField ? (
        <View style={styles.buttonContainer}>
          <Button
            title='Cancel'
            style={[styles.button, { opacity: 0.5, marginRight: Spacings.s }]}
            textStyle={styles.buttonText}
            onPress={() => {
              setTempName(name);
              setTempEmail(email);
              setTempPassword(password);
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
              setName(tempName);
              setEmail(tempEmail);
              setPassword(tempPassword);
              setIsEditingName(false);
              setIsEditingEmail(false);
              setIsEditingPassword(false);
            }}
          />
        </View>
      ) : (
        <Button
          title='Logout'
          style={styles.button}
          textStyle={styles.buttonText}
        />
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
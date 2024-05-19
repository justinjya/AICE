import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useState } from 'react';
import { Colors, Sizes, Spacings } from "@values";
import { Button, EditableField } from '@components';
import { AuthContext, updateUser, signOut } from '@utils'

export default function AccountDetailsScreen() {
  const { session, name, setName } = useContext(AuthContext);
  const [tempName, setTempName] = useState(name as string);
  const [isEditingName, setIsEditingName] = useState(false);
  const isEditingAnyField = isEditingName;

  const handleCancel = () => {
    setTempName(name as string);
    setIsEditingName(false);
  }

  const handleSave = async () => {
    if (session === null) return;

    setName(tempName);
    await updateUser(session, tempName);
    setIsEditingName(false);
  }

  const handleSignOut = async () => signOut();
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Account Details</Text>
      <View style={styles.detailsContainer}>
        <EditableField
          title="Name"
          attribute={name as string}
          isEditingProps={{ isEditing: isEditingName, setIsEditing: setIsEditingName }}
          tempValueProps={{ tempValue: tempName, setTempValue: setTempName }}
          style={{ marginBottom: Spacings.l }}
          inputFieldStyle={{ marginBottom: Spacings.m_s }}
        />
        <EditableField
          title="Email"
          attribute={session?.user.email as string}
          style={{ marginBottom: Spacings.l }}
          inputFieldStyle={{ marginBottom: Spacings.m_s }}
          disabled={true}
        />
      </View>
      {isEditingAnyField ? (
        <View style={styles.buttonContainer}>
          <Button
            title='Cancel'
            style={[styles.button, { opacity: 0.5, marginRight: Spacings.s }]}
            textStyle={styles.buttonText}
            onPress={handleCancel} />
          <Button
            title='Save'
            style={styles.button}
            textStyle={styles.buttonText}
            onPress={handleSave} />
        </View>
      ) : (
        <Button
          title='Logout'
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={handleSignOut} />
      )}
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
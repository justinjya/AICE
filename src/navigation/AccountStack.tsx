import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NotLoggedInAccountDetailsScreen, AccountDetailsScreen } from '@screens';
import { useContext } from 'react';
import { AuthContext } from '@utils';

const Stack = createNativeStackNavigator();
const screenOptions = { headerShown: false };

export default function AccountStack() {
  const { session } = useContext(AuthContext);
  const isSignedIn = session !== null;

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {!isSignedIn ? (
        <Stack.Screen name="AS_NotLoggedInAccountDetails" component={NotLoggedInAccountDetailsScreen} />
      ) : (
        <Stack.Screen name="AS_AccountDetails" component={AccountDetailsScreen} />
      )}
    </Stack.Navigator>
  );
};
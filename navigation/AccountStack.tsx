import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NotLoggedInAccountDetailsScreen, LoginScreen, RegisterScreen } from '@screens';

const Stack = createNativeStackNavigator();
const screenOptions = { headerShown: false };

export default function AccountStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="AS_NotLoggedInAccountDetails" component={NotLoggedInAccountDetailsScreen} />
      <Stack.Screen name="AS_Login" component={LoginScreen} />
      <Stack.Screen name="AS_Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NotLoggedInAccountDetailsScreen } from '@screens';

const Stack = createNativeStackNavigator();
const screenOptions = { headerShown: false };

export default function AccountStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="AS_NotLoggedInAccountDetails" component={NotLoggedInAccountDetailsScreen} />
    </Stack.Navigator>
  );
};
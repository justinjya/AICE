import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, RegisterScreen } from 'src/screens';

const Stack = createNativeStackNavigator();
const screenOptions = { headerShown: false };

export default function AuthenticationStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="AU_Login" component={LoginScreen} />
      <Stack.Screen name="AU_Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};
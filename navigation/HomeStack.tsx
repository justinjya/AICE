import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, RecipeDetailsScreen } from '@screens';

const Stack = createNativeStackNavigator();
const screenOptions = { headerShown: false };

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HS_Home" component={HomeScreen} />
      <Stack.Screen name="HS_Details" component={RecipeDetailsScreen} />
    </Stack.Navigator>
  );
};
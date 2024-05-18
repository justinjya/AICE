import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavoritesScreen, RecipeDetailsScreen } from '@screens';

const Stack = createNativeStackNavigator();
const screenOptions = { headerShown: false };

export default function FavoritesStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="FS_Favorites" component={FavoritesScreen} />
      <Stack.Screen name="FS_Details" component={RecipeDetailsScreen} />
    </Stack.Navigator>
  );
};
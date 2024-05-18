import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MealPlanMonthScreen, MealPlanWeekScreen, RecipeDetailsScreen } from '@screens';

const Stack = createNativeStackNavigator();
const screenOptions = { headerShown: false };

export default function MealPlanStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="MS_MealPlanMonth" component={MealPlanMonthScreen} />
      <Stack.Screen name="MS_MealPlanWeek" component={MealPlanWeekScreen} />
      <Stack.Screen name="MS_Details" component={RecipeDetailsScreen} />
    </Stack.Navigator>
  );
};
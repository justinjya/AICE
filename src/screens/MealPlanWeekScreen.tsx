import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacings, Sizes } from '@values';
import { LongRecipeCard, IconButton } from '@components';
import { AuthContext, RecipesContext, addMealPlan, fetchRecipe } from '@utils';
import { Session } from '@supabase/supabase-js';

interface WeekHeaderProps {
  selectedDay: Date;
  setSelectedDay: (date: Date) => void;
}

const isDateEqual = (date1: Date, date2: Date) => 
  date1.getDate() === date2.getDate() && 
  date1.getMonth() === date2.getMonth() && 
  date1.getFullYear() === date2.getFullYear();

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function WeekHeader({ selectedDay, setSelectedDay }: WeekHeaderProps) {
  const { mealPlans} = useContext(RecipesContext);
  const [startOfWeek, setStartOfWeek] = useState(new Date());

  useEffect(() => {
    const start = new Date(selectedDay);
    const dayOfWeek = start.getDay();
    start.setDate(start.getDate() - dayOfWeek);
    setStartOfWeek(start);
  }, [selectedDay]);

  const changeWeek = (direction: number) => {
    setStartOfWeek(prevStartOfWeek => {
      const newStartOfWeek = new Date(prevStartOfWeek);
      newStartOfWeek.setDate(newStartOfWeek.getDate() + 7 * direction);
      return newStartOfWeek;
    });
  };

  const isMealPlanned = (date: Date) => {
    return mealPlans.some(meal => {
      const mealDate = new Date(meal.date);
      return isDateEqual(mealDate, date);
    });
  };

  return (
    <View style={styles.weekHeaderContainer}>
      <TouchableOpacity style={{ marginTop: Spacings.m }} onPress={() => changeWeek(-1)}>
        <Ionicons name="chevron-back" size={15} color={Colors.text_dark} />
      </TouchableOpacity>

      {daysOfWeek.map((day, index) => {
        const date = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + index);
        const isSelected = selectedDay && isDateEqual(selectedDay, date);
        const isPlanned = isMealPlanned(date);
        return (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.dayText}>{day}</Text>
            <TouchableOpacity style={[styles.dateButton, { backgroundColor: isSelected ? Colors.primary : Colors.gray_100 }]} onPress={() => setSelectedDay(date)}>
              <Text style={[styles.dateText, { color: isSelected ? Colors.onPrimary : Colors.text_dark }]}>{date.getDate()}</Text>
              {isPlanned ? 
                <View style={[styles.dot, { backgroundColor: isSelected ? Colors.onPrimary : Colors.primary }]}/>
                : 
                <View style={[styles.dot, { backgroundColor: 'transparent' }]}/>
              }
            </TouchableOpacity>
          </View>
        );
      })}

      <TouchableOpacity style={{ marginTop: Spacings.m }} onPress={() => changeWeek(1)}>
        <Ionicons name="chevron-forward" size={15} color={Colors.text_dark} />
      </TouchableOpacity>
    </View>
  );
}

interface MealSectionProps {
  array: any[];
  schedule: string;
  date: Date;
  onAddPress?: () => void;
};

function MealsSection({
  array,
  schedule,
  date,
  onAddPress,
}: MealSectionProps) {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const meals = useMemo(() => {
    return array.filter(meal => {
      const mealDate = new Date(meal.date);
      return meal.schedule === schedule && isDateEqual(mealDate, date);
    });
  }, [array, schedule, date]);

  return (
    <View style={{ marginBottom: Spacings.l }}>
      <View style={[styles.titleContainer, { marginBottom: Spacings.m }]}>
        <Text style={styles.h2}>{schedule}</Text>
      </View>
      {meals.map(meals => (
        <View key={meals.id} style={{ marginBottom: Spacings.xxs }}>
          <LongRecipeCard
            recipe={meals.Recipe}
            onPress={() => navigation.navigate('MS_Details', { recipeId: meals.Recipe.id })} />
        </View>
      ))}
      <IconButton
        icon={
          <Ionicons
            name='add'
            size={14}
            color={Colors.gray_300} />
          }
        style={styles.emptySection}
        onPress={onAddPress} />
    </View>
  )
}

interface MealPlanWeekScreenProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

export default function MealPlanWeekScreen({ navigation, route }: MealPlanWeekScreenProps) {
  const { year, month, day } = route.params
  const { recipeId } = route.params ?? { };
  const { session } = useContext(AuthContext);
  const { mealPlans, setMealPlans } = useContext(RecipesContext);
  const [selectedDay, setSelectedDay] = useState(new Date(year, month, day) as Date);

  useEffect(() => {}, [session])

  const handleAddPress = async (recipeId: number, schedule: string) => {
    if (session === null) {
      Alert.alert('You must be logged in to add a recipe to your meal plans.');
      return;
    }

    if (recipeId !== undefined) {
      try {
        await addMealPlan(recipeId, session as Session, schedule, selectedDay);
        const fetchedRecipe = await fetchRecipe(recipeId);
        const newMealPlan = {
          Recipe: fetchedRecipe,
          date: selectedDay.toISOString(),
          schedule: schedule
        };
        setMealPlans(prevMealPlans => [...prevMealPlans, newMealPlan]);
        navigation.setParams({ recipeId: undefined });
      } catch (error) {
        console.log(error);
      };
    } else {
      navigation.navigate('HS_Home');
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.titleContainer, { marginBottom: Spacings.xxl }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconButton
           icon={
             <Ionicons name="chevron-back" size={24} color={Colors.text_dark} />
           }
           style={{ marginRight: Spacings.l }}
           onPress={() => navigation.goBack()} />
          <Text style={styles.title}>Meal Plan</Text>
        </View>
        <IconButton
          icon={
            <Ionicons
              name='calendar-clear-outline'
              size={24}
              color={Colors.secondary} />
          }
          onPress={() => navigation.goBack()} />
      </View>
      <WeekHeader selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <MealsSection 
        array={mealPlans} 
        schedule='Breakfast' 
        date={selectedDay}
        onAddPress={() => handleAddPress(recipeId, 'Breakfast')} />
      <MealsSection 
        array={mealPlans} 
        schedule='Lunch' 
        date={selectedDay}
        onAddPress={() => handleAddPress(recipeId, 'Lunch')} />
      <MealsSection 
        array={mealPlans} 
        schedule='Dinner' 
        date={selectedDay}
        onAddPress={() => handleAddPress(recipeId, 'Dinner')} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacings.m,
  },
  title: {
    fontSize: Sizes.h1,
  },
  h2: {
    fontSize: Sizes.h2,
  },
  titleContainer: { 
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacings.l,
  },
  weekHeaderButton: {
    marginTop: Spacings.m,
  },
  dayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: Sizes.l,
    marginBottom: Spacings.s,
  },
  dateButton: {
    width: 37,
    height: 37,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    marginBottom: Spacings.xxxs,
  },
  dot:{
    width: 4,
    height: 4,
    borderRadius: 50 
  },
  emptySection: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Colors.gray_100,
    borderRadius: 10,
    alignItems:'center',
    justifyContent: 'center',
    paddingVertical: Spacings.s,
  },
});
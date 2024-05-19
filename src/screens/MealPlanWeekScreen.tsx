import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacings, Sizes } from '@values';
import { LongRecipeCard, IconButton } from '@components';

const mealPlans = [
  {
    id: 1,
    recipe: { 
      id: 1,
      name: 'Breakfast Hash',
      calories: 350,
      duration: 45,
      imageUrl: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg',
    },
    schedule: 'Breakfast',
    date: new Date(2024, 4, 14),
  },
  {
    id: 2,
    recipe: {
      id: 2,
      name: 'Pancake Tacos',
      calories: 450,
      duration: 60,
      imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=600,545',
    }, 
    schedule: 'Breakfast',
    date: new Date(2024, 4, 14),
  },
  {
    id: 3,
    recipe: {
      id: 3,
      name: 'Mushrooms on Toast',
      calories: 300,
      duration: 30,
      imageUrl: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/6/12/3/FNM070116_Penne-with-Vodka-Sauce-and-Mini-Meatballs-recipe_s4x3.jpg.rend.hgtvcom.1280.1280.suffix/1465939620872.jpeg',
    }, 
    schedule: 'Breakfast',
    date: new Date(2024, 4, 14),
  },
  {
    id: 4,
    recipe: {
      id: 4,
      name: 'Padron Peppers',
      calories: 250,
      duration: 20,
      imageUrl: 'https://img.bestrecipes.com.au/iyddCRce/br/2019/02/1980-crunchy-chicken-twisties-drumsticks-951509-1.jpg',
    },
    schedule: 'Dinner',
    date: new Date(2024, 4, 14),
  },
  {
    id: 5,
    recipe: {
      id: 4,
      name: 'Padron Peppers',
      calories: 250,
      duration: 20,
      imageUrl: 'https://img.bestrecipes.com.au/iyddCRce/br/2019/02/1980-crunchy-chicken-twisties-drumsticks-951509-1.jpg',
    },
    schedule: 'Breakfast',
    date: new Date(2024, 4, 17),
  },
];

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
  const [startOfWeek, setStartOfWeek] = useState(new Date());

  useEffect(() => {
    const start = new Date(selectedDay);
    const dayOfWeek = start.getDay();
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek;
    start.setDate(start.getDate() - diff);
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
    return mealPlans.some(meal => 
      meal.date instanceof Date && 
      isDateEqual(meal.date, date)
    );
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
  date?: Date;
  onCardPress?: () => void;
  onAddPress?: () => void;
};

function MealsSection({ array, schedule, date, onCardPress, onAddPress }: MealSectionProps) {
  const meals = array.filter(meal => 
    meal.schedule === schedule && 
    meal.date instanceof Date && 
    date instanceof Date && 
    isDateEqual(meal.date, date)
  ).map(meal => meal.recipe);

  return (
    <View style={{ marginBottom: Spacings.l }}>
      <View style={[styles.titleContainer, { marginBottom: Spacings.m }]}>
        <Text style={styles.h2}>{schedule}</Text>
        <IconButton
          icon={
            <Ionicons
              name='add'
              size={24}
              color={Colors.text_dark}
              style={{ opacity: 0.5 }} />
          }
          onPress={onAddPress} />
      </View>
      {meals.length === 0 ? (
        <View style={styles.emptySection} />
      ) : (
        meals.map(recipe => (
          <View key={recipe.id} style={{ marginBottom: Spacings.xxs }}>
            <LongRecipeCard
              key={recipe.id}
              recipe={recipe}
              onPress={onCardPress} />
          </View>
        ))
      )}
    </View>
  )
}

interface MealPlanWeekScreenProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

export default function MealPlanWeekScreen({ navigation, route }: MealPlanWeekScreenProps) {
  const { year, month, day } = route.params
  const [selectedDay, setSelectedDay] = useState(new Date(year, month, day) as Date);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.titleContainer, { marginBottom: Spacings.xxl }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconButton
           icon={
             <Ionicons name="chevron-back" size={24} color={Colors.text_dark} />
           }
           style={{ marginRight: Spacings.l }}
           onPress={() => navigation.goBack()}/>
          <Text style={styles.title}>Meal Plan</Text>
        </View>
        <IconButton
          icon={
            <Ionicons
              name='calendar-clear-outline'
              size={24}
              color={Colors.secondary} />
          }
          onPress={() => navigation.goBack()}/>
      </View>
      <WeekHeader selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <MealsSection 
        array={mealPlans} 
        schedule='Breakfast' 
        date={selectedDay}
        onCardPress={() => navigation.navigate('MS_Details')} />
      <MealsSection 
        array={mealPlans} 
        schedule='Lunch' 
        date={selectedDay}
        onCardPress={() => navigation.navigate('MS_Details')} />
      <MealsSection 
        array={mealPlans} 
        schedule='Dinner' 
        date={selectedDay}
        onCardPress={() => navigation.navigate('MS_Details')} />
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
    height: 4,
    backgroundColor: Colors.gray_100,
    borderRadius: 10,
  },
});
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import { Spacings, Sizes } from '@values';
import { Calendar } from '@components';

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

interface MealPlanMonthProps {
  navigation: NavigationProp<ParamListBase>
}

export default function MealPlanMonthScreen({ navigation }: MealPlanMonthProps) {
  const months = Array.from({ length: 12 }, (_, i) => i);
  const scrollViewRef = useRef<ScrollView>(null);
  const currentMonth = new Date().getMonth();

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ x: 0, y: currentMonth * 363, animated: false }); // Assuming each month takes up 363px
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.title}>Meal Plan</Text>
      <ScrollView ref={scrollViewRef}>
        {months.map((month) => (
          <Calendar
            mealPlans={mealPlans}
            key={month}
            year={2024}
            month={month} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacings.m,
    marginBottom: -Spacings.m
  },
  title: {
    fontSize: Sizes.h1,
    marginBottom: Spacings.l,
  }
});

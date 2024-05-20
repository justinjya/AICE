import { ScrollView, StyleSheet, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext, useEffect, useRef, useState } from 'react';
import { Spacings, Sizes } from '@values';
import { Calendar } from '@components';
import { fetchMealPlans, AuthContext, RecipesContext } from '@utils';

interface MealPlanMonthProps {
  route: any;
}

export default function MealPlanMonthScreen({ route }: MealPlanMonthProps) {
  const { recipeId } = route.params ?? {};
  const { session } = useContext(AuthContext);
  const { mealPlans, setMealPlans } = useContext(RecipesContext);
  const months = Array.from({ length: 12 }, (_, i) => i);
  const flatListRef = useRef<FlatList>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session) {
          const fetchedMealPlans = await fetchMealPlans(session);
          setMealPlans(fetchedMealPlans);
        } else {
          setMealPlans([]);
        };
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      };
    };
  
    fetchData();
  }, [session]);
  
  useEffect(() => {
    if (!isLoading && flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: new Date().getMonth(), animated: false });
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.title}>Meal Plan</Text>
      <FlatList
        ref={flatListRef}
        data={months}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item: month }) => (
          <Calendar
            recipeId={recipeId}
            mealPlans={mealPlans}
            key={month}
            year={2024}
            month={month} />
        )}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
          });
        }}
      />
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

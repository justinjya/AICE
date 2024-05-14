import { 
  View, SafeAreaView, StyleSheet, 
  Text, TouchableOpacity,
  FlatList, Dimensions, SectionList
} from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacings, Sizes } from '@values';
import { LongRecipeCard, IconButton, Pagination } from '@components';

const recipes = [
  { 
    id: 1,
    name: 'Breakfast Hash',
    calories: 350,
    duration: 45,
    imageUrl: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg',
  },
  {
    id: 2,
    name: 'Pancake Tacos',
    calories: 450,
    duration: 60,
    imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=600,545',
  }, 
  {
    id: 3,
    name: 'Mushrooms on Toast',
    calories: 300,
    duration: 30,
    imageUrl: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/6/12/3/FNM070116_Penne-with-Vodka-Sauce-and-Mini-Meatballs-recipe_s4x3.jpg.rend.hgtvcom.1280.1280.suffix/1465939620872.jpeg',
  }, 
  {
    id: 4,
    name: 'Padron Peppers',
    calories: 250,
    duration: 20,
    imageUrl: 'https://img.bestrecipes.com.au/iyddCRce/br/2019/02/1980-crunchy-chicken-twisties-drumsticks-951509-1.jpg',
  }
]
const breakfast = {
  title: 'Breakfast',
  data: recipes.slice(0, 3),
}
const lunch = {
  title: 'Lunch',
  data: [],
}
const dinner = {
  title: 'Dinner',
  data: recipes.slice(3, 4),
}

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface WeekHeaderProps {
  selectedDay: Date | null;
  setSelectedDay: (date: Date) => void;
}

function WeekHeader({ selectedDay, setSelectedDay }: WeekHeaderProps) {
  const [startOfWeek, setStartOfWeek] = useState(() => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    return startOfWeek;
  });

  const changeWeek = (direction: number) => {
    setStartOfWeek(prevStartOfWeek => {
      const newStartOfWeek = new Date(prevStartOfWeek);
      newStartOfWeek.setDate(newStartOfWeek.getDate() + 7 * direction);
      return newStartOfWeek;
    });
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacings.l }}>
      <TouchableOpacity style={{ marginTop: Spacings.m }}onPress={() => changeWeek(-1)}>
        <Ionicons name="chevron-back" size={15} color={Colors.text_dark} />
      </TouchableOpacity>

      {daysOfWeek.map((day, index) => {
        const date = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + index);
        const isSelected = selectedDay && date.getDate() === selectedDay.getDate() && date.getMonth() === selectedDay.getMonth() && date.getFullYear() === selectedDay.getFullYear();
        return (
          <View key={index} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: Sizes.l, marginBottom: Spacings.s }}>{day}</Text>
            <TouchableOpacity style={{ width: 37, height: 37, borderRadius: 5, backgroundColor: isSelected ? Colors.primary : Colors.gray_100, alignItems: 'center', justifyContent: 'center' }} onPress={() => setSelectedDay(date)}>
              <Text style={{ color: isSelected ? Colors.onPrimary : Colors.text_dark, marginBottom: Spacings.xxxs }}>{date.getDate()}</Text>
              <View style={{ backgroundColor: isSelected ? Colors.onPrimary : Colors.primary, width: 4, height: 4, borderRadius: 50 }}/>
            </TouchableOpacity>
          </View>
        );
      })}

      <TouchableOpacity style={{ marginTop: Spacings.m }}onPress={() => changeWeek(1)}>
        <Ionicons name="chevron-forward" size={15} color={Colors.text_dark} />
      </TouchableOpacity>
    </View>
  );
}

export default function MealPlanWeekScreen() {
  const [selectedDay, setSelectedDay] = useState(new Date() as Date | null);

  // Only show the recipes on the 14th
  const sections = selectedDay && selectedDay.getDate() === 14 ? [breakfast, lunch, dinner] : [];

  return (
    <SectionList
      ListHeaderComponent={
        <View style={{ paddingHorizontal: Spacings.m }}>
          <View style={[styles.titleContainer, { marginBottom: Spacings.xxl }]}>
            <Text style={styles.title}>Meal Plan</Text>
            <IconButton
              icon={
                <Ionicons
                  name='calendar-clear-outline'
                  size={24}
                  color={Colors.secondary} />
              } />
          </View>
          <WeekHeader selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        </View>
      }
      sections={sections}
      keyExtractor={item => item.id.toString()}
      renderSectionHeader={({ section: { title } }) => (
        <View style={[styles.titleContainer, { marginBottom: Spacings.m, paddingHorizontal: Spacings.m }]}>
          <Text style={styles.h2}>{title}</Text>
          <IconButton
            icon={
              <Ionicons
                name='add'
                size={24}
                color={Colors.text_dark}
                style={{ opacity: 0.5 }} />
            } />
        </View>
      )}
      renderItem={({ item }) => {
        return (
          <View style={{ paddingHorizontal: Spacings.m, marginBottom: Spacings.xxs }}>
            <LongRecipeCard
              recipe={item} />
          </View>
        )}
      }
      renderSectionFooter={({ section }) => (
        section.data.length === 0 ? (
          <View style={{ paddingHorizontal: Spacings.m, marginBottom: Spacings.l }}>
            <View style={{ width: '100%', height: 4, backgroundColor: Colors.gray_100, borderRadius: 10 }} />
          </View>
        ) : (
          <View style={{ marginBottom: Spacings.l }} />
        )
      )} 
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
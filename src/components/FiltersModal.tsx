import {
  StyleSheet, ScrollView, View,
  Text, TextInput, Dimensions
} from "react-native";
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { Colors, Sizes, Spacings } from '@values';
import { FiltersType, FiltersContext } from "@utils";
import Button from './Button';

interface FiltersModalProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

const ITEMS_PER_PAGE = 8;

export default function FiltersModal({ isVisible, setIsVisible }: FiltersModalProps) {
  const { ingredients, categories, setFilters } = React.useContext(FiltersContext);
  const [ingredientsToShow, setIngredientsToShow] = useState(ingredients.slice(0, ITEMS_PER_PAGE));
  const [categoriesToShow, setCategoriesToShow] = useState(categories.slice(0, ITEMS_PER_PAGE));
  const [selectedIngredients, setSelectedIngredients] = useState<{ [key: string]: boolean }>({});
  const [selectedCategories, setSelectedCategories] = useState<{ [key: string]: boolean }>({});
  const [minCalories, setMinCalories] = useState('');
  const [maxCalories, setMaxCalories] = useState('');
  const [minTime, setMinTime] = useState('');
  const [maxTime, setMaxTime] = useState('');

  const applyFilters = () => {
    const newFilters: FiltersType = {
      ingredients: selectedIngredients ? Object.keys(selectedIngredients).filter(key => selectedIngredients[key]).map(Number) : [],
      categories: selectedCategories ? Object.keys(selectedCategories).filter(key => selectedCategories[key]).map(Number) : [],
      minCalories: minCalories ? Number(minCalories) : null,
      maxCalories: maxCalories ? Number(maxCalories) : null,
      minTime: minTime ? Number(minTime) : null,
      maxTime: maxTime ? Number(maxTime) : null,
    };

    setFilters(newFilters);
  };

  const resetFilters = () => {
    setSelectedIngredients({});
    setSelectedCategories({});
  };

  const handleShowMore = (array: Array<any>, itemsToShow: Array<any>, setItemsToShow: React.Dispatch<React.SetStateAction<any>>) => {
    const nextItems = array.slice(itemsToShow.length, itemsToShow.length + ITEMS_PER_PAGE);
    setItemsToShow([...itemsToShow, ...nextItems]);
  }
  const isMoreIngredients = ingredientsToShow.length < ingredients.length;
  const isMoreCategories = categoriesToShow.length < categories.length;

  const setMinCaloriesSafe = (value: string) => {
  if (maxCalories && Number(value) > Number(maxCalories)) {
    alert('Min calories cannot be greater than max calories');
    return;
  }
  setMinCalories(value);
};

const setMaxCaloriesSafe = (value: string) => {
  if (minCalories && Number(value) < Number(minCalories)) {
    alert('Max calories cannot be less than min calories');
    return;
  }
  setMaxCalories(value);
};

const setMinTimeSafe = (value: string) => {
  if (maxTime && Number(value) > Number(maxTime)) {
    alert('Min time cannot be greater than max time');
    return;
  }
  setMinTime(value);
};

const setMaxTimeSafe = (value: string) => {
  if (minTime && Number(value) < Number(minTime)) {
    alert('Max time cannot be less than min time');
    return;
  }
  setMaxTime(value);
};

  return (
    <Modal 
      isVisible={isVisible} 
      onSwipeComplete={() => setIsVisible(false)}
      swipeDirection="down"
      style={{ width: '100%', margin: 0 }}
      propagateSwipe
      onModalHide={applyFilters} >
      <View style={styles.container}>
        <View style={styles.pullBarThingy} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.h1}>Filters</Text>
            <Button
              title='Reset'
              textStyle={[styles.h2, { color: Colors.secondary }]}
              onPress={resetFilters} />
          </View>
          <Text style={styles.h2}>Calories</Text>
          <View style={styles.rangeSection}>
            <TextInput
              value={minCalories}
              onChangeText={setMinCaloriesSafe}
              placeholder='Minimum'
              style={[styles.rangeInput, { fontSize: Sizes.l, marginRight: Spacings.s }]}
              keyboardType='number-pad'/>
            <Text style={{ marginRight: Spacings.s }}>Kcal</Text>
            <Text style={{ marginRight: Spacings.s }}>-</Text>
            <TextInput
              value={maxCalories}
              onChangeText={setMaxCaloriesSafe}
              placeholder='Maximum'
              style={[styles.rangeInput, { fontSize: Sizes.l, marginRight: Spacings.s }]}
              keyboardType='number-pad'/>
            <Text style={{ marginRight: Spacings.s }}>Kcal</Text>
          </View>
          <Text style={styles.h2}>Time</Text>
          <View style={styles.rangeSection}>
            <TextInput
              value={minTime}
              onChangeText={setMinTimeSafe}
              placeholder='Minimum'
              style={[styles.rangeInput, { fontSize: Sizes.l, marginRight: Spacings.s }]}
              keyboardType='number-pad'/>
            <Text style={{ marginRight: Spacings.s }}>Mins</Text>
            <Text style={{ marginRight: Spacings.s }}>-</Text>
            <TextInput
              value={maxTime}
              onChangeText={setMaxTimeSafe}
              placeholder='Maximum'
              style={[styles.rangeInput, { fontSize: Sizes.l, marginRight: Spacings.s }]}
              keyboardType='number-pad'/>
            <Text style={{ marginRight: Spacings.s }}>Mins</Text>
          </View>
          <Text style={styles.h2}>Ingredients</Text>
          <View style={styles.rowWrap}>
            {ingredientsToShow.map(item => 
              <Button
                key={item.id}
                title={item.name}
                style={[
                  styles.button,
                  selectedIngredients[item.id] ? styles.selectedButton : null,
                ]}
                textStyle={{ fontSize: Sizes.l }}
                onPress={() => setSelectedIngredients({ ...selectedIngredients, [item.id]: !selectedIngredients[item.id] })}
              />
            )}
          </View>
          {isMoreIngredients && <Button title="Show more" style={{ alignSelf: 'flex-end' }} textStyle={styles.showMore} onPress={() => handleShowMore(ingredients, ingredientsToShow, setIngredientsToShow)} />}
          <Text style={styles.h2}>Categories</Text>
          <View style={styles.rowWrap}>
            {categoriesToShow.map(item => 
              <Button
              key={item.id}
              title={item.name}
              style={[
                styles.button,
                selectedCategories[item.id] ? styles.selectedButton : null,
              ]}
              textStyle={{ fontSize: Sizes.l }}
              onPress={() => setSelectedCategories({ ...selectedCategories, [item.id]: !selectedCategories[item.id] })}
            />
            )}
          </View>
          {isMoreCategories && <Button title="Show more" style={{ alignSelf: 'flex-end' }} textStyle={styles.showMore} onPress={() => handleShowMore(categories, categoriesToShow, setCategoriesToShow)} />}
        </ScrollView>
      </View>
    </Modal>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 696,
    backgroundColor: Colors.background,
    position: 'absolute',
    bottom: 0,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingHorizontal: Spacings.m,
    paddingTop: Spacings.s,
    paddingBottom: Spacings.xxl
  },
  pullBarThingy: {
    width: 86,
    height: 5,
    backgroundColor: '#D7D7D7',
    alignSelf: 'center',
    marginBottom: Spacings.s,
  },
  h1: {
    fontSize: Sizes.h1,
    marginBottom: Spacings.l
  },
  h2: {
    fontSize: Sizes.h2,
    marginBottom: Spacings.m
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacings.s
  },
  button: {
    width: screenWidth / 2 - Spacings.l,
    height: 28,
    backgroundColor: Colors.gray_100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.gray_200,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacings.l,
    marginRight: Spacings.xs,
    marginBottom: Spacings.xs
  },
  selectedButton: {
    backgroundColor: Colors.purple_100,
    borderColor: Colors.secondary,
  },
  showMore: {
    color: Colors.secondary,
    fontSize: Sizes.l
  },
  rangeInput: {
    width: screenWidth / 3 - Spacings.l,
    height: 28,
    backgroundColor: Colors.gray_100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.gray_200,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacings.l,
    marginRight: Spacings.xs,
    marginBottom: Spacings.xs
  },
  rangeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacings.l
  }
});
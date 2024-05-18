import { StyleSheet, ScrollView, View, Text, TextInput } from "react-native";
import React, { useState } from 'react';
import { Colors, Sizes, Spacings } from '@values';
import Modal from 'react-native-modal';
import Button from './Button';

const ingredients = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Carrot' },
  { id: 4, name: 'Doughnut' },
  { id: 5, name: 'Egg' },
  { id: 6, name: 'Fries' },
  { id: 7, name: 'Grapes' },
  { id: 8, name: 'Hamburger' },
  { id: 9, name: 'Ice Cream' },
  { id: 10, name: 'Jelly' },
  { id: 11, name: 'Kiwi' },
  { id: 12, name: 'Lemon' },
  { id: 13, name: 'Mango' },
  { id: 14, name: 'Noodles' },
  { id: 15, name: 'Orange' },
  { id: 16, name: 'Pasta' },
  { id: 17, name: 'Quiche' },
  { id: 18, name: 'Rice' },
  { id: 19, name: 'Strawberry' },
  { id: 20, name: 'Tomato' },
  { id: 21, name: 'Udon' },
  { id: 22, name: 'Vegetables' },
  { id: 23, name: 'Watermelon' },
  { id: 24, name: 'Xylocarp' },
  { id: 25, name: 'Yogurt' },
  { id: 26, name: 'Zucchini' },
];

const categories = [
  { id: 1, name: 'Breakfast' },
  { id: 2, name: 'Lunch' },
  { id: 3, name: 'Dinner' },
  { id: 4, name: 'Snack' },
  { id: 5, name: 'Dessert' },
  { id: 6, name: 'Drink' },
  { id: 7, name: 'Appetizer' },
  { id: 8, name: 'Main Course' },
  { id: 9, name: 'Side Dish' },
  { id: 10, name: 'Salad' },
  { id: 11, name: 'Soup' },
  { id: 12, name: 'Bread' },
  { id: 13, name: 'Sauce' },
  { id: 14, name: 'Marinade' },
  { id: 15, name: 'Dip' },
  { id: 16, name: 'Spread' },
  { id: 17, name: 'Condiment' },
  { id: 18, name: 'Preserve' },
  { id: 19, name: 'Candy' },
  { id: 20, name: 'Snack' },
  { id: 21, name: 'Beverage' },
  { id: 22, name: 'Alcoholic Beverage' },
  { id: 23, name: 'Cocktail' },
  { id: 24, name: 'Smoothie' },
  { id: 25, name: 'Milkshake' },
  { id: 26, name: 'Hot Drink' },
  { id: 27, name: 'Cold Drink' },
];

interface FiltersModalProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

const ITEMS_PER_PAGE = 12;

export default function FiltersModal({ isVisible, setIsVisible }: FiltersModalProps) {
  const [ingredientsToShow, setIngredientsToShow] = useState(ingredients.slice(0, ITEMS_PER_PAGE));
  const [categoriesToShow, setCategoriesToShow] = useState(categories.slice(0, ITEMS_PER_PAGE));
  const [selectedIngredients, setSelectedIngredients] = useState<{ [key: string]: boolean }>({});
  const [selectedCategories, setSelectedCategories] = useState<{ [key: string]: boolean }>({});

  const handleShowMore = (array: Array<any>, itemsToShow: Array<any>, setItemsToShow: React.Dispatch<React.SetStateAction<any>>) => {
    const nextItems = array.slice(itemsToShow.length, itemsToShow.length + ITEMS_PER_PAGE);
    setItemsToShow([...itemsToShow, ...nextItems]);
  }

  const isMoreIngredients = ingredientsToShow.length < ingredients.length;
  const isMoreCategories = categoriesToShow.length < categories.length;

  return (
    <Modal 
      isVisible={isVisible} 
      onSwipeComplete={() => setIsVisible(false)}
      swipeDirection="down"
      style={{ width: '100%', margin: 0 }}
      propagateSwipe
    >
      <View style={styles.container}>
        <View style={styles.pullBarThingy} />
        <ScrollView showsVerticalScrollIndicator={false}>

          <Text style={styles.h1}>Filters</Text>
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
          <Text style={styles.h2}>Calories</Text>
          <View style={styles.rangeSection}>
            <TextInput placeholder='Minimum' style={[styles.button, { fontSize: Sizes.l, marginRight: Spacings.s }]} />
            <Text style={{ marginRight: Spacings.s }}>Kcal</Text>
            <Text style={{ marginRight: Spacings.s }}>-</Text>
            <TextInput placeholder='Maximum' style={[styles.button, { fontSize: Sizes.l, marginRight: Spacings.s }]} />
            <Text style={{ marginRight: Spacings.s }}>Kcal</Text>
          </View>
          <Text style={styles.h2}>Time</Text>
          <View style={styles.rangeSection}>
            <TextInput placeholder='Minimum' style={[styles.button, { fontSize: Sizes.l, marginRight: Spacings.s }]} />
            <Text style={{ marginRight: Spacings.s }}>Mins</Text>
            <Text style={{ marginRight: Spacings.s }}>-</Text>
            <TextInput placeholder='Maximum' style={[styles.button, { fontSize: Sizes.l, marginRight: Spacings.s }]} />
            <Text style={{ marginRight: Spacings.s }}>Mins</Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

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
    width: 111,
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
  rangeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacings.l
  }
});
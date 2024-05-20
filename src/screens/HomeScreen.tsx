import { View, StyleSheet, Text, FlatList } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useState, useMemo, useRef, useContext, useEffect } from 'react';
import { AuthContext, RecipesContext, FiltersContext } from '@utils';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors, Spacings, Sizes } from '@values';
import { FullWidthRecipeCard, RecipeCard, IconButton, Pagination, FiltersModal } from '@components';

interface HeaderComponentProps {
  filtersModalState: {
    isFiltersModalVisible?: boolean;
    setIsFiltersModalVisible: (value: boolean) => void;
  };
  filterActiveState: {
    isFilterActive: boolean;
    setIsFilterActive: (value: boolean) => void;
  };
  navigation: NavigationProp<ParamListBase>;
}

function HeaderComponent({ 
  filtersModalState: { setIsFiltersModalVisible },
  filterActiveState: { isFilterActive, setIsFilterActive },
  navigation
}: HeaderComponentProps) {
  const { session, name } = useContext(AuthContext);
  const { suggestions } = useContext(RecipesContext);
  const { filters } = useContext(FiltersContext);
  const insets = useSafeAreaInsets();
  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    setActiveIndex(viewableItems[0].index);
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const isFilterFilled = 
      filters.categories.length > 0 &&
      filters.ingredients.length > 0 &&
      filters.minCalories !== null &&
      filters.maxCalories !== null &&
      filters.minTime !== null &&
      filters.maxTime !== null;
    setIsFilterActive(isFilterFilled);
  }, [filters, setIsFilterActive]);

  return (
    <>
      <View style={{ marginTop: insets.top, paddingHorizontal: Spacings.m }}>
        <Text style={styles.header}>
          {session ? `Hello, ${name}` : 'Hello, Guest'}
        </Text>
        <Text style={[styles.header, { marginBottom: Spacings.m }]}>What would you like to cook today?</Text>
        <Text style={[styles.title, { marginBottom: Spacings.s }]}>Our Suggestions</Text>
      </View>
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        contentContainerStyle={{ marginBottom: Spacings.s }}
        renderItem={({ item }: any) => (
          <FullWidthRecipeCard recipe={item} onPress={() => navigation.navigate('HS_Details', { recipeId: item.id })} />
        )}
      />
      <View style={{ paddingHorizontal: Spacings.m }}>
        <Pagination
          activeIndex={activeIndex}
          arr={suggestions }
          style={{ width: 74, marginBottom: Spacings.l }} />
        <View style={[styles.titleContainer, { marginBottom: Spacings.s }]}>
          <Text style={[styles.title]}>All Recipes</Text>
          <IconButton
            icon={isFilterActive ? (
              <FontAwesome5
                name='sliders-h'
                size={15}
                color={Colors.onSecondary} />
            ) : (
              <FontAwesome5
                name='sliders-h'
                size={15}
                color={Colors.secondary} />
            )}
            style={[styles.filterIcon, { backgroundColor: isFilterActive ? Colors.secondary : Colors.onSecondary }]}
            onPress={() => setIsFiltersModalVisible(true)} />
        </View>
      </View>
    </>
  )
}

interface HomeScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { recipes } = useContext(RecipesContext);
  const { filters, recipesWithIngredients, recipesWithCategories } = useContext(FiltersContext);
  const [isFiltersModalVisible, setIsFiltersModalVisible] = useState(false);
  const [isFilterActive, setIsFilterActive] = useState(false);

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const recipeIngredients = recipesWithIngredients
        .filter(item => item.recipe_id === recipe.id)
        .map(item => item.ingredient_id);

      const recipeCategories = recipesWithCategories
        .filter(item => item.recipe_id === recipe.id)
        .map(item => item.category_id);

      const hasIngredient = filters.ingredients && filters.ingredients.length > 0 ?
        (filters.ingredients.length > 1 ?
          filters.ingredients.every((ingredientId: number) => recipeIngredients.includes(ingredientId)) :
          filters.ingredients.some((ingredientId: number) => recipeIngredients.includes(ingredientId))) :
        true;

      const hasCategory = filters.categories && filters.categories.length > 0 ?
        filters.categories.some((categoryId: number) => recipeCategories.includes(categoryId)) :
        true;

      const hasValidCalories = (filters.minCalories ? recipe.calories >= filters.minCalories : true) && 
                              (filters.maxCalories ? recipe.calories <= filters.maxCalories : true);
      const hasValidTime = (filters.minTime ? recipe.time >= filters.minTime : true) && 
                          (filters.maxTime ? recipe.time <= filters.maxTime : true);

      return hasIngredient && hasCategory && hasValidCalories && hasValidTime;
    });
  }, [recipes, filters, recipesWithIngredients, recipesWithCategories]);

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <FlatList 
        ListHeaderComponent={
          <HeaderComponent 
            filtersModalState={{ setIsFiltersModalVisible }}
            filterActiveState={{ isFilterActive, setIsFilterActive }}
            navigation={navigation} />
        }
        data={filteredRecipes}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        columnWrapperStyle={styles.cardsContainer}
        renderItem={({ item }) =>
          <RecipeCard recipe={item} onPress={() => navigation.navigate('HS_Details', { recipeId: item.id })} />
        } 
      />
      <FiltersModal 
        isVisible={isFiltersModalVisible} 
        setIsVisible={setIsFiltersModalVisible} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: Sizes.h3,
  },
  title: {
    fontSize: Sizes.h1,
  },
  titleContainer: { 
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterIcon: {
    borderColor: Colors.secondary,
    borderWidth: 2,
    padding: 2
  },
  cardsContainer: {
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: Spacings.m,
    marginBottom: Spacings.m,
  },
});
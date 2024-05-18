import { View, StyleSheet, Text, FlatList } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors, Spacings, Sizes } from '@values';
import { RecipeCard, IconButton, FiltersModal } from '@components';

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
  },
  { 
    id: 5,
    name: 'Breakfast Hash',
    calories: 350,
    duration: 45,
    imageUrl: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg',
  },
  {
    id: 6,
    name: 'Pancake Tacos',
    calories: 450,
    duration: 60,
    imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=600,545',
  }, 
  {
    id: 7,
    name: 'Mushrooms on Toast',
    calories: 300,
    duration: 30,
    imageUrl: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/6/12/3/FNM070116_Penne-with-Vodka-Sauce-and-Mini-Meatballs-recipe_s4x3.jpg.rend.hgtvcom.1280.1280.suffix/1465939620872.jpeg',
  }, 
  {
    id: 8,
    name: 'Padron Peppers',
    calories: 250,
    duration: 20,
    imageUrl: 'https://img.bestrecipes.com.au/iyddCRce/br/2019/02/1980-crunchy-chicken-twisties-drumsticks-951509-1.jpg',
  },
]

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
  }: HeaderComponentProps) {
  const insets = useSafeAreaInsets()

  return (
    <View style={{ marginTop: insets.top, paddingHorizontal: Spacings.m }}>
      <View style={[styles.titleContainer, { marginBottom: Spacings.l }]}>
        <Text style={[styles.title]}>Favorites</Text>
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
  )
}

interface FavoritesScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

export default function FavoritesScreen({ navigation }: FavoritesScreenProps) {
  const [isFiltersModalVisible, setIsFiltersModalVisible] = useState(false);
  const [isFilterActive, setIsFilterActive] = useState(false);

  return (
    <SafeAreaView edges={['left', 'right']}>
      <FlatList
        ListHeaderComponent={
          <HeaderComponent 
            filtersModalState={{ setIsFiltersModalVisible }}
            filterActiveState={{ isFilterActive, setIsFilterActive }} 
            navigation={navigation} />
        }
        data={recipes}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        columnWrapperStyle={styles.cardsContainer}
        renderItem={({ item }: any) => (
          <RecipeCard recipe={item} onPress={() => navigation.navigate('FS_Details')} />
        )}
        style={{ height: '100%' }} />
      <FiltersModal
        key={isFiltersModalVisible ? 'visible' : 'hidden'} 
        isVisible={isFiltersModalVisible}
        setIsVisible={setIsFiltersModalVisible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: Spacings.m,
    marginBottom: Spacings.m
  },
  smallCardTextDetails: {
    color: Colors.text_light,
    fontSize: Sizes.m,
    marginRight: Spacings.xs
  },
  smallCardTextTitle: {
    color: Colors.text_light,
    fontSize: Sizes.h2,
    textAlignVertical: 'bottom'
  },
});
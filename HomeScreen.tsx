import { 
  View, SafeAreaView, StyleSheet, 
  Text, Pressable,
  FlatList, Dimensions,
} from 'react-native';
import { useState, useRef } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors, Spacings, Sizes } from '@values';
import { Card, IconButton, Pagination } from '@components';

const todaysPicksImages = [
  'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=600,545',
  'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg',
  'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/6/12/3/FNM070116_Penne-with-Vodka-Sauce-and-Mini-Meatballs-recipe_s4x3.jpg.rend.hgtvcom.1280.1280.suffix/1465939620872.jpeg',
  'https://img.delicious.com.au/j95dyjBJ/del/2022/10/australian-capital-territory-kingleys-chicken-176385-3.png',
  'https://img.bestrecipes.com.au/iyddCRce/br/2019/02/1980-crunchy-chicken-twisties-drumsticks-951509-1.jpg'
];
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
const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    setActiveIndex(viewableItems[0].index);
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        ListHeaderComponent={
          <>
            <View style={{ paddingHorizontal: Spacings.m }}>
              <Text style={styles.header}>Hello, John Doe</Text>
              <Text style={[styles.header, { marginBottom: Spacings.m }]}>What would you like to cook today?</Text>
              <Text style={[styles.title, { marginBottom: Spacings.m }]}>Today's Picks</Text>
            </View>
            <FlatList
              data={recipes}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onViewableItemsChanged={onViewableItemsChanged.current}
              viewabilityConfig={viewabilityConfig.current}
              contentContainerStyle={{ marginBottom: Spacings.s }}
              renderItem={({ item }: any) => (
                <Pressable>
                  <Card
                    recipe={item}
                    style={{ width: screenWidth, height: 274 }}
                    detailsIconSize={Sizes.l}
                    detailsIconStyle={{ marginRight: Spacings.s }}
                    detailsTextStyle={styles.textTodaysPicksDetails}
                    titleTextStyle={styles.textTodaysPicksTitle} />
                </Pressable>
              )}
            />
            <View style={{ paddingHorizontal: Spacings.m }}>
              <Pagination
                activeIndex={activeIndex}
                arr={recipes}
                style={{ width: 74, marginBottom: Spacings.l }}
              />
              <View style={[styles.titleContainer, { marginBottom: Spacings.s }]}>
                <Text style={[styles.title]}>All Recipes</Text>
                <IconButton
                  icon={isFilterActive ? (
                    <FontAwesome5
                      name='sliders-h'
                      size={18}
                      color={Colors.onSecondary} />
                  ) : (
                    <FontAwesome5
                      name='sliders-h'
                      size={18}
                      color={Colors.secondary} />
                  )}
                  style={[styles.filterIcon, { backgroundColor: isFilterActive ? Colors.secondary : Colors.onSecondary }]}
                  onPress={() => setIsFilterActive(!isFilterActive)}
                  />
              </View>
            </View>
          </>
        }
        data={recipes}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        columnWrapperStyle={styles.cardsContainer}
        renderItem={({ item }) =>
          <Card
            recipe={item}
            style={{ width: 171, height: 188 }}
            backgroundStyle={{ borderRadius: 10 }}
            detailsIconSize={Sizes.m}
            detailsIconStyle={{ marginRight: Spacings.xxs }}
            detailsTextStyle={styles.smallCardTextDetails}
            titleTextStyle={styles.smallCardTextTitle}
          />
        } 
      />
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
  textTodaysPicksDetails: {
    color: Colors.text_light,
    fontSize: Sizes.l,
    marginRight: Spacings.s_m,
  },
  textTodaysPicksTitle: {
    color: Colors.text_light,
    fontSize: Sizes.h1,
    textAlignVertical: 'bottom'
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
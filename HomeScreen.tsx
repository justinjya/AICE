import { 
  View, SafeAreaView, StyleSheet, 
  Text, Image, TouchableOpacity, Pressable,
  FlatList, Dimensions
} from 'react-native';
import React, { useState, useRef } from 'react';
import { AntDesign, FontAwesome5, SimpleLineIcons, Octicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacings, Sizes } from '@values';

const user = 'John Doe';
const initialImages = [
  'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=600,545',
  'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg',
  'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/6/12/3/FNM070116_Penne-with-Vodka-Sauce-and-Mini-Meatballs-recipe_s4x3.jpg.rend.hgtvcom.1280.1280.suffix/1465939620872.jpeg',
  'https://img.delicious.com.au/j95dyjBJ/del/2022/10/australian-capital-territory-kingleys-chicken-176385-3.png',
  'https://img.bestrecipes.com.au/iyddCRce/br/2019/02/1980-crunchy-chicken-twisties-drumsticks-951509-1.jpg'
];
const arr = [
  { 
    id: 1,
    name: 'Breakfast Hash',
    calories: 350,
    duration: 45,
  },
  {
    id: 2,
    name: 'Pancake Tacos',
    calories: 450,
    duration: 60,
  }, 
  {
    id: 3,
    name: 'Mushrooms on Toast',
    calories: 300,
    duration: 30,
  }, 
  {
    id: 4,
    name: 'Padron Peppers',
    calories: 250,
    duration: 20,
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
              <Text style={styles.header}>Hello, {user}</Text>
              <Text style={[styles.header, { marginBottom: Spacings.m }]}>What would you like to cook today?</Text>
              <Text style={[styles.title, { marginBottom: Spacings.m }]}>Today's Picks</Text>
            </View>
            <FlatList
              data={initialImages}
              keyExtractor={(index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ marginBottom: Spacings.s }}
              onViewableItemsChanged={onViewableItemsChanged.current}
              viewabilityConfig={viewabilityConfig.current}
              horizontal
              pagingEnabled
              renderItem={({ item }) => (
                <Pressable>
                  <Image source={{ uri: item }} style={{ width: screenWidth, height: 274 }} />
                </Pressable>
              )}
            />
            <View style={{ paddingHorizontal: Spacings.m }}>
              <View style={{ width: 74, flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', paddingBottom: Spacings.l }}>
                {initialImages.map((_, index) => (
                  <Octicons
                    key={index}
                    name="dot-fill"
                    size={index === activeIndex ? 20 : 16}
                    color={index === activeIndex ? Colors.secondary : Colors.gray_300}
                    style={{ marginTop: index === activeIndex ? -2 : 0}}
                  />
                ))}
              </View>
              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: Spacings.s}}>
                <Text style={[styles.title]}>All Recipes</Text>
                <TouchableOpacity onPress={() => setIsFilterActive(!isFilterActive)}>
                  {isFilterActive ? (
                    <View style={{ backgroundColor: Colors.secondary, borderColor: Colors.secondary, borderWidth: 2, padding: 2 }}>
                      <FontAwesome5
                      name='sliders-h'
                      size={18}
                      color={Colors.onSecondary} />
                    </View>
                  ) : (
                    <View style={{ borderColor: Colors.secondary, borderWidth: 2, padding: 2 }}>
                      <FontAwesome5
                      name='sliders-h'
                      size={18}
                      color={Colors.secondary} />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </>
        }
        data={arr}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: Spacings.m, paddingHorizontal: Spacings.m }}
        renderItem={({ item }) =>
          <TouchableOpacity style={styles.card} >
            <Image
              source={{ uri: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=600,545' }}
              style={styles.background} />
            <LinearGradient
              colors={['rgba(0,0,0,0.5)', 'transparent', 'transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}
              style={styles.background}
            />
            <AntDesign
              name='ellipsis1'
              size={23}
              color={Colors.onPrimary}
              style={{ alignSelf: 'flex-end', margin: 12 }} />
            <View style={styles.textContainer}>
              <View style={styles.detailsContainer}>
                <SimpleLineIcons 
                  name='fire'
                  size={8}
                  color={Colors.primary}
                  style={{ marginRight: 4 }} />
                <Text style={[styles.textDetails, { marginRight: 8 }]}>
                  {item.calories} kcal
                </Text>
                <SimpleLineIcons
                  name='clock'
                  size={8}
                  color={Colors.primary}
                  style={{ marginRight: 4 }} />
                <Text style={styles.textDetails}>
                  {item.duration} mins
                </Text>
              </View>
              <Text style={styles.textTitle}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        } />
      
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
  card: {
    width: 171,
    height: 188,
    borderRadius: 10,
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 10,
    padding: 16
  },
  textContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end'
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  textDetails: {
    color: Colors.text_dark,
    fontSize: 8
  },
  textTitle: {
    color: Colors.text_dark,
    fontSize: 20,
    textAlignVertical: 'bottom'
  },
});
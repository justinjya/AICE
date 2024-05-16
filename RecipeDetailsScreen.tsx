import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { SimpleLineIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Spacings, Sizes, Colors } from "@values";
import { Button } from "@components";

const recipe = { 
  id: 1,
  name: 'Breakfast Hash',
  calories: 350,
  duration: 45,
  ingredients: [
    {
      id: 1,
      name: 'olive oil',
      measurement: '2 tbsp'
    },
    {
      id: 2,
      name: 'onion',
      measurement: '1, diced'
    },
    {
      id: 3,
      name: 'garlic',
      measurement: '2 cloves, minced'
    },
    {
      id: 4,
      name: 'bell peppers',
      measurement: '2, diced'
    },
    {
      id: 5,
      name: 'potatoes',
      measurement: '2, diced'
    },
    {
      id: 6,
      name: 'paprika',
      measurement: '1 tsp'
    },
    {
      id: 7,
      name: 'cumin',
      measurement: '1 tsp'
    },
    {
      id: 8,
      name: 'chili powder',
      measurement: '1/2 tsp'
    },
    {
      id: 9,
      name: 'salt',
      measurement: '1/2 tsp'
    },
    {
      id: 10,
      name: 'pepper',
      measurement: '1/4 tsp'
    },
    {
      id: 11,
      name: 'eggs',
      measurement: '4'
    },
    {
      id: 12,
      name: 'parsley',
      measurement: '1 tbsp, chopped'
    }
  ],
  instructions: [
    {
      id: 1,
      step: 'Heat olive oil in a large skillet over medium heat.'
    },
    {
      id: 2,
      step: 'Add onion and garlic and cook until soft, about 5 minutes.'
    },
    {
      id: 3,
      step: 'Add bell peppers and potatoes and cook until potatoes are golden brown, about 15 minutes.'
    },
    {
      id: 4,
      step: 'Add paprika, cumin, chili powder, salt, and pepper and stir to combine.'
    },
    {
      id: 5,
      step: 'Make 4 wells in the hash and crack an egg into each well.'
    },
    {
      id: 6,
      step: 'Cover and cook until eggs are cooked to your liking, about 5 minutes for runny yolks.'
    },
    {
      id: 7,
      step: 'Garnish with parsley and serve.'
    }
  ],
  imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=600,545',
}

export default function RecipeDetailsScreen(){
  const insets = useSafeAreaInsets();

  return(
    <SafeAreaView edges={['left', 'right']}>
      <ScrollView>
        <Image source={{ uri: recipe.imageUrl }} style={{ height: 360 }} />
        <LinearGradient colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 360 }} />
        <Ionicons name="chevron-back" size={24} style={{ position: 'absolute', top: insets.top, left: 10, color: Colors.onPrimary }} />
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.title}>Classic Lasagne</Text>
            <Entypo name="dots-three-horizontal" size={20} style={{ marginTop: Spacings.m, color: Colors.text}} />
          </View>
          <View style={styles.recipeNutritionContainer}>
            <SimpleLineIcons name="fire" size={20} style={ {marginRight: Spacings.s, color: Colors.primary} }/>
            <Text style={[styles.recipeNutritionText, { marginRight: Spacings.m }]}>500 kcal</Text>
            <SimpleLineIcons name="clock" size={20} style={ {marginRight: Spacings.s, color: Colors.primary} }/>
            <Text style={styles.recipeNutritionText}>1 hr and 40 mins</Text>
          </View>
          <Button
            title='Make it vegan!'
            style={[styles.veganButton, { marginBottom: Spacings.m }]}
            textStyle={styles.veganButtonText}
            rightIcon={<Entypo name="leaf" size={20} color={Colors.onPrimary} />}
            onPress={() => {}} />
        </View>
        <View style={[styles.listContainer, { marginBottom: Spacings.m }]}>
          <Text style={styles.listTitle}>Ingredients</Text>
          {recipe.ingredients.map((ingredient) => (
            <View style={styles.itemContainer}>
              <View style={styles.dot} />
              <Text style={styles.listItemText}>{ingredient.name} {ingredient.measurement}</Text>
            </View> 
          ))}
        </View>
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Instructions</Text>
          {recipe.instructions.map((instruction) => (
            <View style={styles.itemContainer}>
              <View style={styles.dot} />
              <Text style={styles.listItemText}>{instruction.step}</Text>
            </View> 
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacings.m
  },
  title: {
    fontSize: Sizes.h1,
    color: Colors.text,
    width: '50%',
    marginBottom: Spacings.m,
    marginTop: Spacings.m,
  },
  recipeNutritionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacings.m,
  },
  recipeNutritionText: {
    fontSize: Sizes.h3,
    color: Colors.text
  },
  recipeDetailsContainer: {
    backgroundColor: Colors.gray_100,
    marginBottom: Spacings.m,
  },
  veganButton: {
    backgroundColor: Colors.tertiary,
    borderRadius: 10,
    paddingVertical: Spacings.s,
    justifyContent: 'center',
    alignItems  : 'center',
  },
  veganButtonText: {
    fontSize: Sizes.h3,
    color: Colors.onTertiary,
    marginRight: Spacings.m 
  },
  listContainer: {
    backgroundColor: Colors.gray_100,
    padding: Spacings.m,
    marginHorizontal: Spacings.m,
    borderRadius: 20
  },
  listTitle: {
    fontSize: Sizes.h3,
    marginBottom: Spacings.s
  },
  itemContainer: {
    backgroundColor: Colors.gray_100,
    flexDirection: 'row',
    paddingHorizontal: Spacings.m,
    paddingVertical: Spacings.s
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: Colors.white,
    borderRadius: 50,
    marginRight: Spacings.s,
    marginTop: 6
  },
  listItemText: {
    fontSize: Sizes.l,
    color: Colors.text,
    marginBottom: Spacings.xs
  },
});
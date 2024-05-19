import { StyleSheet, View, Text, Image, ScrollView, Linking, TouchableOpacity } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationProp, ParamListBase, useFocusEffect } from '@react-navigation/native';
import { SimpleLineIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useCallback } from 'react';
import { Spacings, Sizes, Colors } from "@values";
import { Button, IconButton, RecipeDetailsModal } from "@components";
import { fetchRecipeDetails } from "@utils";

interface RecipeDetailsScreenProps {
  navigation: NavigationProp<ParamListBase>
  route: any,
}

export default function RecipeDetailsScreen({ navigation, route  }: RecipeDetailsScreenProps) {
  const insets = useSafeAreaInsets();
  const { recipeId } = route.params;

  const [recipe, setRecipe] = useState<any | undefined>()
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);

  const toggleRecipeDetailsModal = () => {
    setIsDetailsModalVisible(!isDetailsModalVisible);
  };

  useFocusEffect(
    useCallback(() => {
      const getRecipeDetails = async () => {
        try {
          setIsLoading(true);
          const fetchedRecipeDetails = await fetchRecipeDetails(recipeId);
          setRecipe(fetchedRecipeDetails);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }

      getRecipeDetails();
    }, [recipeId])
  );

  if (isLoading) {
    return;
  };

  return (
    <SafeAreaView edges={['left', 'right']}>
      <ScrollView>
        <TouchableOpacity activeOpacity={0.9} onPress={() => Linking.openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')}>
          <Image source={{ uri: recipe.imageUrl }} style={{ height: 360 }} />
          <LinearGradient colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 360 }} />
        </TouchableOpacity>
        <IconButton
          icon={
            <Ionicons name="chevron-back" size={24} style={{ color: Colors.onPrimary }} />
          }
          style={{ position: 'absolute', top: insets.top, left: 10 }}
          onPress={() => navigation.goBack()} />
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.title}>{recipe.name}</Text>
            <IconButton
              icon={
                <Entypo name="dots-three-horizontal" size={20} style={{ marginTop: Spacings.m, color: Colors.onBackground}} />
              }
              onPress={toggleRecipeDetailsModal} />
          </View>
          <View style={styles.recipeNutritionContainer}>
            <SimpleLineIcons name="fire" size={20} style={ {marginRight: Spacings.s, color: Colors.primary} }/>
            <Text style={[styles.recipeNutritionText, { marginRight: Spacings.m }]}>{recipe.calories} kcal</Text>
            <SimpleLineIcons name="clock" size={20} style={ {marginRight: Spacings.s, color: Colors.primary} }/>
            <Text style={styles.recipeNutritionText}>{recipe.duration} mins</Text>
          </View>
          {recipe.vegan_recipe_id ? (
            <Button
              title='Make it vegan!'
              style={[styles.veganButton, { marginBottom: Spacings.m }]}
              textStyle={styles.veganButtonText}
              rightIcon={<Entypo name="leaf" size={20} color={Colors.onPrimary} />}
              onPress={() => {}} />
          ) : null}
          <View style={[styles.listContainer, { marginBottom: Spacings.m }]}>
            <Text style={styles.listTitle}>Ingredients</Text>
            {recipe.Recipe_Ingredient_Measurement.map((ingredient: any, index: number) => (
              <View key={index} style={styles.itemContainer}>
                <View style={styles.dot} />
                <Text style={styles.listItemText}>{ingredient.Ingredient.name} {ingredient.Measurement.measurement}</Text>
              </View> 
            ))}
          </View>
          <View style={[styles.listContainer, { marginBottom: Spacings.s_m }]}>
            <Text style={styles.listTitle}>Instructions</Text>
            {recipe.Instruction.map((instruction: any) => (
              <View key={instruction.id} style={styles.itemContainer}>
                <View style={styles.dot} />
                <Text style={styles.listItemText}>{instruction.instruction}</Text>
              </View> 
            ))}
          </View>
          <Text style={styles.credit}>Recipe from Good Food</Text>
        </View>
        <RecipeDetailsModal
          recipeId={recipeId}
          isVisible={isDetailsModalVisible} 
          setIsVisible={setIsDetailsModalVisible}
          navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacings.m,
    paddingBottom: Spacings.m
  },
  title: {
    fontSize: Sizes.h1,
    color: Colors.text_dark,
    width: '50%',
    marginBottom: Spacings.s_m,
    marginTop: Spacings.m,
  },
  recipeNutritionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacings.m,
  },
  recipeNutritionText: {
    fontSize: Sizes.h3,
    color: Colors.text_dark
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
    alignItems: 'center',
  },
  veganButtonText: {
    fontSize: Sizes.h3,
    color: Colors.onTertiary,
    marginRight: Spacings.m 
  },
  listContainer: {
    backgroundColor: Colors.gray_100,
    padding: Spacings.m,
    borderRadius: 20
  },
  listTitle: {
    fontSize: Sizes.h3,
    marginBottom: Spacings.s
  },
  itemContainer: {
    backgroundColor: Colors.gray_100,
    flexDirection: 'row',
    paddingHorizontal: Spacings.s,
    paddingVertical: Spacings.s
  },
  dot: {
    width: 6,
    height: 6,
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 50,
    marginRight: Spacings.s,
    marginTop: 6
  },
  listItemText: {
    fontSize: Sizes.l,
    color: Colors.text_dark,
    marginBottom: Spacings.xs
  },
  credit: {
    fontSize: Sizes.m,
    color: Colors.text_dark,
    alignSelf: 'center',
  }
});
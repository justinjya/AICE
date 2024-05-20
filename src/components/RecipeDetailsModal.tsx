import { StyleSheet, View, Alert } from "react-native";
import { NavigationProp, ParamListBase, useFocusEffect } from "@react-navigation/native";
import { useCallback, useContext, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Sizes, Spacings } from '@values';
import { AuthContext, checkIfFavorite, addFavorite, removeFavorite } from '@utils';
import Button from './Button';
import Modal from 'react-native-modal';

interface RecipeDetailsPopUpProps {
  recipeId: number;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  navigation: NavigationProp<ParamListBase>
}

export default function RecipeDetailsModal({ recipeId, isVisible, setIsVisible, navigation }: RecipeDetailsPopUpProps) {
  const { session } =  useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInMealPlan] = useState(false);

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        try {
          if (session) {
            await checkIfFavorite(recipeId, session).then((result) => {
              setIsFavorite(result);
            });
          } else {
            setIsFavorite(false);
          };
        } catch (error) {
          console.log(error)
        }
      };
  
      fetchData();
    }, [session, recipeId])
  );

  const handleFavoritePress = async () => {
    if (session === null) {
      Alert.alert('You must be logged in to add a recipe to your favorites.');
      return;
    }

    try {
      if (!isFavorite) {
        await addFavorite(recipeId, session);
        setIsFavorite(true);
      } else {
        await removeFavorite(recipeId, session);
        setIsFavorite(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMealPlanPress = () => {
    if (session === null) {
      Alert.alert('You must be logged in to add a recipe to your meal plans.');
      return;
    }

    navigation.navigate('MealPlan', { 
      screen: 'MS_MealPlanMonth', 
      params: { recipeId: recipeId }
    });
    setIsVisible(false);
  };

  return (
    <Modal 
      isVisible={isVisible} 
      onSwipeComplete={() => setIsVisible(false)}
      swipeDirection="down"
      style={{ width: '100%', margin: 0 }}
    >
      <View style={styles.container}>
        <View style={styles.pullBarThingy} />
        <Button
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          leftIcon={
            <Ionicons 
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={20}
              style={{ marginRight: Spacings.l }}
              color={isFavorite ? Colors.error : Colors.text_dark }
            />
          }
          onPress={handleFavoritePress}
          style={[styles.button, { marginBottom: Spacings.s }]}
          textStyle={[styles.buttonText, { color: isFavorite ? Colors.error : Colors.text_dark }]}
        />
        <Button
          title={isInMealPlan ? 'Remove from meal plan' : 'Add to meal plan'}
          leftIcon={
            <Ionicons
              name={isInMealPlan ? 'calendar-clear': 'calendar-clear-outline'}
              size={20}
              style={{ marginRight: Spacings.l }}
              color={isInMealPlan ? Colors.error : Colors.text_dark}
            />
          }
          onPress={handleMealPlanPress}
          style={[styles.button, { marginBottom: Spacings.xxxl }]}
          textStyle={[styles.buttonText, { color: isInMealPlan ? Colors.error : Colors.text_dark }]}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.background,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingHorizontal: Spacings.m,
    paddingTop: Spacings.s,
  },
  button: {
    width: '100%',
    height: 53,
    backgroundColor: Colors.gray_100,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: Spacings.l,
  },
  buttonText: {
    fontSize: Sizes.h3,
  },
  pullBarThingy: {
    width: 86,
    height: 5,
    backgroundColor: '#D7D7D7',
    alignSelf: 'center',
    marginBottom: Spacings.xxl,
  },
});

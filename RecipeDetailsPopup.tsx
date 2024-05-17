import { StyleSheet, View } from "react-native";
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Sizes, Spacings } from '@values';
import { Button } from '@components';

export default function RecipeDetailsPopUp() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInMealPlan, setIsInMealPlan] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const toggleMealPlan = () => {
    setIsInMealPlan(!isInMealPlan);
  };

  return (
    <View style={styles.container}>
      <View style={styles.pullBarThingy} />
      <Button
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        leftIcon={
          <Ionicons 
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            style={{ marginRight: Spacings.l }}
            color={isFavorite ? Colors.error : Colors.text }
          />
        }
        onPress={toggleFavorite}
        style={[styles.button, { marginBottom: Spacings.s }]}
        textStyle={[styles.buttonText, { color: isFavorite ? Colors.error : Colors.text }]}
      />
      <Button
        title={isInMealPlan ? 'Remove from meal plan' : 'Add to meal plan'}
        leftIcon={
          <Ionicons
            name={isInMealPlan ? 'calendar-clear': 'calendar-clear-outline'}
            size={20}
            style={{ marginRight: Spacings.l }}
            color={isInMealPlan ? Colors.error : Colors.text}
          />
        }
        onPress={toggleMealPlan}
        style={[styles.button, { marginBottom: Spacings.xxxl }]}
        textStyle={[styles.buttonText, { color: isInMealPlan ? Colors.error : Colors.text }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.background,
    position: 'absolute',
    bottom: 0,
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

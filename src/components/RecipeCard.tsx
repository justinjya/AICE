import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacings, Sizes } from '@values';

interface CardProps {
  recipe: {
    id: number,
    name: string,
    calories: number,
    duration: number,
    imageUrl: string,
  };
  onPress?: () => void;
}

export default function RecipeCard({ recipe, onPress }: CardProps) {
  return (
    <TouchableOpacity style={[styles.container]} activeOpacity={0.8} onPress={onPress}>
      <Image
        source={{ uri: recipe.imageUrl }}
        style={[styles.container, { position: 'absolute', borderRadius: 10 }]} />
      <LinearGradient
        colors={['rgba(0,0,0,0.55)', 'transparent', 'transparent', 'rgba(0,0,0,0.65)', 'rgba(0,0,0,0.9)', 'rgba(0,0,0,1)']}
        style={[styles.container, { position: 'absolute', borderRadius: 10 }]}
        start={{ x: 0.5, y: -0.1 }}
        end={{ x: 0, y: 1 }}
      />
      <View style={styles.textContainer}>
      <Text style={styles.textTitle}>{recipe.name}</Text>
        <View style={styles.detailsContainer}>
          <SimpleLineIcons 
            name='fire'
            size={Sizes.m}
            color={Colors.primary}
            style={{ marginRight: Spacings.xs }} />
          <Text style={styles.textDetails}>{recipe.calories} kcal</Text>
          <SimpleLineIcons
            name='clock'
            size={Sizes.m}
            color={Colors.primary}
            style={{ marginRight: Spacings.xs }} />
          <Text style={styles.textDetails}>{recipe.duration} mins</Text>
        </View> 
      </View>
    </TouchableOpacity>
  )
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: screenWidth / 2 - Spacings.l,
    height: 188,
  },
  textContainer: {
    flex: 1,
    padding: Spacings.m,
    justifyContent: 'flex-end'
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textDetails: {
    color: Colors.text_light,
    fontSize: Sizes.m,
    marginRight: Spacings.xs
  },
  textTitle: {
    color: Colors.text_light,
    fontSize: Sizes.h2,
    textAlignVertical: 'bottom',
    marginBottom: Spacings.xxs
  },
});
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
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
};

export default function LongRecipeCard({ recipe, onPress }: CardProps) {
  return (
    <TouchableOpacity style={styles.cardContainer} activeOpacity={0.8} onPress={onPress}>
      <Image
        source={{ uri: recipe.imageUrl }}
        style={styles.background} />
      <LinearGradient
        colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.8)', 'transparent', 'transparent', 'rgba(0,0,0,0.8)']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }} />
      <View style={styles.textContainer}>
        <Text style={styles.smallCardTextTitle}>{recipe.name}</Text>
        <View style={styles.detailsContainer}>
          <SimpleLineIcons 
            name='fire'
            size={Sizes.s}
            color={Colors.primary}
            style={{ marginRight: Spacings.xxs }} />
          <Text style={[styles.smallCardTextDetails, { marginRight: Spacings.xxs }]}>{recipe.calories} kcal</Text>
          <SimpleLineIcons
            name='clock'
            size={Sizes.s}
            color={Colors.primary}
            style={{ marginRight: Spacings.xxs }} />
          <Text style={styles.smallCardTextDetails}>{recipe.duration} mins</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%', 
    height: 56, 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    paddingLeft: Spacings.m,
    justifyContent: 'center'
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacings.xxs
  },
  smallCardTextTitle: {
    color: Colors.text_light,
    fontSize: Sizes.h3,
    textAlignVertical: 'bottom'
  },
  smallCardTextDetails: {
    color: Colors.text_light,
    fontSize: Sizes.m,
    marginRight: Spacings.xxs
  },
});
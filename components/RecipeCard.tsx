import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacings, Sizes } from '@values';
import IconButton from './IconButton';

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
    <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={onPress}>
      <Image
        source={{ uri: recipe.imageUrl }}
        style={styles.background} />
      <LinearGradient
        colors={['rgba(0,0,0,0.25)', 'transparent', 'transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}
        style={styles.background}
      />
      {/* <IconButton
        icon={
          <AntDesign
            name='ellipsis1'
            size={23}
            color={Colors.onPrimary}
            style={{ alignSelf: 'flex-end', margin: Spacings.s_m }} />
        }
      /> */}
      <View style={styles.textContainer}>
        <View style={styles.detailsContainer}>
          <SimpleLineIcons 
            name='fire'
            size={Sizes.m}
            color={Colors.primary}
            style={{ marginRight: Spacings.xxs }} />
          <Text style={styles.textDetails}>{recipe.calories} kcal</Text>
          <SimpleLineIcons
            name='clock'
            size={Sizes.m}
            color={Colors.primary}
            style={{ marginRight: Spacings.xxs }} />
          <Text style={styles.textDetails}>{recipe.duration} mins</Text>
        </View>
        <Text style={styles.textTitle}>{recipe.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 171,
    height: 188,
  },
  background: {
    width: 171,
    height: 188,
    position: 'absolute',
    borderRadius: 10
  },
  textContainer: {
    flex: 1,
    padding: Spacings.m,
    justifyContent: 'flex-end'
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacings.xxs
  },
  textDetails: {
    color: Colors.text_light,
    fontSize: Sizes.m,
    marginRight: Spacings.xs
  },
  textTitle: {
    color: Colors.text_light,
    fontSize: Sizes.h2,
    textAlignVertical: 'bottom'
  },
});
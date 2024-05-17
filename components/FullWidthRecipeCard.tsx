import { View, StyleSheet, Text, Image, Pressable, Dimensions } from 'react-native';
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

export default function FullWidthRecipeCard({ recipe, onPress }: CardProps) {
  const screenWidth = Dimensions.get('window').width;

  return (
    <Pressable style={{ width: screenWidth, height: 274 }} onPress={onPress}>
      <Image
        source={{ uri: recipe.imageUrl }}
        style={[styles.background, { width: screenWidth, height: 274 }]} />
      <LinearGradient
        colors={['rgba(0,0,0,0.25)', 'transparent', 'transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}
        style={[styles.background, { width: screenWidth, height: 274 }]}
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
            size={Sizes.l}
            color={Colors.primary}
            style={{ marginRight: Spacings.s }} />
          <Text style={styles.textDetails}>{recipe.calories} kcal</Text>
          <SimpleLineIcons
            name='clock'
            size={Sizes.l}
            color={Colors.primary}
            style={{ marginRight: Spacings.s }} />
          <Text style={styles.textDetails}>{recipe.duration} mins</Text>
        </View>
        <Text style={styles.textTitle}>{recipe.name}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
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
    fontSize: Sizes.l,
    marginRight: Spacings.s_m,
  },
  textTitle: {
    color: Colors.text_light,
    fontSize: Sizes.h1,
    textAlignVertical: 'bottom'
  },
});
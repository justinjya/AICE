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
  },
  style?: object;
  backgroundStyle?: object;
  detailsIconSize?: number;
  detailsIconStyle?: object;
  detailsTextStyle?: object;
  titleTextStyle?: object;
}

export default function Card({ 
  recipe,
  style, 
  backgroundStyle,
  detailsIconSize, 
  detailsIconStyle,
  detailsTextStyle, 
  titleTextStyle 
}: CardProps) {
  return (
    <View style={style}>
      <Image
        source={{ uri: recipe.imageUrl }}
        style={[styles.background, backgroundStyle]} />
      <LinearGradient
        colors={['rgba(0,0,0,0.25)', 'transparent', 'transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}
        style={[styles.background, backgroundStyle]}
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
            size={detailsIconSize || Sizes.m}
            color={Colors.primary}
            style={detailsIconStyle} />
          <Text style={detailsTextStyle}>{recipe.calories} kcal</Text>
          <SimpleLineIcons
            name='clock'
            size={detailsIconSize || Sizes.m}
            color={Colors.primary}
            style={detailsIconStyle} />
          <Text style={detailsTextStyle}>{recipe.duration} mins</Text>
        </View>
        <Text style={titleTextStyle}>{recipe.name}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
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
});
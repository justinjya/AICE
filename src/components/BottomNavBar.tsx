import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@values';
import IconButton from './IconButton';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

type IconName = 'home' | 'heart-sharp' | 'calendar-clear' | 'person' | 'home-outline' | 'heart-outline' | 'calendar-clear-outline' | 'person-outline';

export default function BottomNavBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: string =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconNames: { [key: string]: IconName } = {
          'Home': isFocused ? 'home' : 'home-outline',
          'Favorites': isFocused ? 'heart-sharp' : 'heart-outline',
          'MealPlan': isFocused ? 'calendar-clear' : 'calendar-clear-outline',
          'Account': isFocused ? 'person' : 'person-outline',
        };

        const iconName: IconName = iconNames[label] || 'home';

        return (
          <IconButton
            key={index}
            icon={
              <Ionicons 
                name={iconName} 
                size={30} 
                color={Colors.onPrimary} 
              />
            }
            style={styles.iconButton} 
            onPress={onPress}
          />
        );
      })}
    </View>
  );
}

export const BOTTOM_NAV_BAR_HEIGHT = 96;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: BOTTOM_NAV_BAR_HEIGHT,
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    backgroundColor: Colors.primary,
    justifyContent: 'space-between',
  },
  iconButton: {
    width: '25%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 19,
  },
});
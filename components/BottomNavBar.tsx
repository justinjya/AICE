import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@values';
import IconButton from './IconButton';

export default function BottomNavBar() {
  const [selectedPage, setSelectedPage] = useState('Home');

  return (
    <View style={styles.container}>
      <IconButton
       icon={
         <Ionicons 
           name={selectedPage === 'Home' ? 'home' : 'home-outline'} 
           size={30} 
           color={Colors.onPrimary} />
       }
       style={styles.iconButton} 
       onPress={() => setSelectedPage('Home')} />
      <IconButton
       icon={
         <Ionicons 
           name={selectedPage === 'Favorites' ? 'heart-sharp' : 'heart-outline'} 
           size={30} 
           color={Colors.onPrimary} />
       }
       style={styles.iconButton}
       onPress={() => setSelectedPage('Favorites')} />
      <IconButton 
        icon={
          <Ionicons 
            name={selectedPage === 'Meal Plan' ? 'calendar-clear' : 'calendar-clear-outline'} 
            size={30} 
            color={Colors.onPrimary} />
        }
        style={styles.iconButton}
        onPress={() => setSelectedPage('Meal Plan')} />
      <IconButton
        icon={
          <Ionicons 
            name={selectedPage === 'Account' ? 'person' : 'person-outline'} 
            size={30} 
            color={Colors.onPrimary} />
        }
        style={styles.iconButton}
        onPress={() => setSelectedPage('Account')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 96,
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
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@values';
import { useState } from 'react';

export default function BottomNavBar() {
  const [selectedPage, setSelectedPage] = useState('Home');
  return (
    <View style={styles.bottomNavBar}>
      <TouchableOpacity style={styles.iconContainer} onPress={() => setSelectedPage('Home')}>
          <Ionicons 
            name={selectedPage === 'Home' ? 'home' : 'home-outline'} 
            size={30} 
            iconStyle={{ pointerEvents: 'none' }}
            color={Colors.onPrimary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => setSelectedPage('Favorites')}>
          <Ionicons 
            name={selectedPage === 'Favorites' ? 'heart-sharp' : 'heart-outline'} 
            size={30} 
            iconStyle={{ pointerEvents: 'none' }}
            color={Colors.onPrimary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => setSelectedPage('Meal Plan')}>
          <Ionicons 
            name={selectedPage === 'Meal Plan' ? 'calendar-clear' : 'calendar-clear-outline'} 
            size={30} 
            iconStyle={{ pointerEvents: 'none' }}
            color={Colors.onPrimary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => setSelectedPage('Account')}>
          <Ionicons 
            name={selectedPage === 'Account' ? 'person' : 'person-outline'} 
            size={30} 
            iconStyle={{ pointerEvents: 'none' }}
            color={Colors.onPrimary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavBar: {
    justifyContent: 'space-between',
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    height: 96,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  iconContainer: {
    height: '100%',
    width: '25%',
    paddingTop: 19,
    alignItems: 'center',
    flexDirection: 'column',
  },
});
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, SafeAreaView } from 'react-native';



const AddToFavoritesButton = () => {
  return (
    <TouchableOpacity style={[styles.addToFavoritesButton]}>
      <Text style={styles.addToFavoritesButtonText}>Add to favorites</Text>
    </TouchableOpacity>
  );
};

export default function RecipeDetailsPopup()
{
    return(
    <SafeAreaView style={styles.container}>
        <Text>Recipe Details</Text>
        <View style={styles.buttonContainer}>
            <AddToFavoritesButton />
        </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
    addToFavoritesButton: {
      backgroundColor: '#ccc', // Light grey background color
      borderRadius: 5, // Rounded corners with 5 pixels radius
      padding: 15, // Padding for text
      flexDirection: 'row', // Arrange text and optional icon in a row (if needed)
      alignItems: 'center', // Align text vertically in the center
    },
    addToFavoritesButtonText: {
      color: 'black', // Text color
      fontSize: 16, // Font size
    },
    container: {
        flex: 1, // Make the container fill the entire screen
        padding: 20,
      },
      buttonContainer: {
        justifyContent: 'flex-end', // Align button to the bottom
      },
    
  });


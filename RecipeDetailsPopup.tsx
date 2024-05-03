import React, { useState } from 'react';
import { Button } from '@components';
import { Colors, Sizes, Spacings } from '@values';
import { SafeAreaView, Text, StyleSheet, Platform, StatusBar as StatusBarAPI, View, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function RecipeDetailsPopup() {
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
        
        <View style={{ height: 54 }}>

            <View style={styles.RectangleShape} />
        </View>
            
            <Button
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                leftIcon={
                    <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={20} style={{ marginRight: Spacings.m}} color={isFavorite ? Colors.error : Colors.text}  />
                }
                onPress={toggleFavorite}
                style={[styles.buttonContainer, { marginBottom: Spacings.s }]}
                textStyle={{color:isFavorite ? Colors.error : Colors.text}}
            />
            <Button
                title={isInMealPlan ? 'Remove from meal plan' : 'Add to meal plan'}
                leftIcon={
                    <Ionicons name={isInMealPlan ? 'calendar-clear': 'calendar-clear-outline'} size={20} style={{ marginRight: Spacings.m }} color={isInMealPlan ? Colors.error : Colors.text}/>
                }
                onPress={toggleMealPlan}
                style={styles.buttonContainer}
                textStyle={{color:isInMealPlan ? Colors.error : Colors.text}}
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
    buttonContainer: {
        height: 53,
        width: '100%',
        backgroundColor: Colors.gray_100,
        borderRadius: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: Spacings.l,
        marginBottom: 40,
    },

    RectangleShape: {
        width: 86,
        height: 5,
        backgroundColor: '#D7D7D7',
        alignSelf: 'center',
    },
});

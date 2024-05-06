import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { Spacings, Sizes, Colors } from "@values";
import { SimpleLineIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { Button } from "@components";

export default function RecipeDetailsScreen(){
  return(
    <SafeAreaView style={styles.container}>
      <View style={[ { backgroundColor: 'red', flex: 2, height: 360, position: 'relative' }]}>
        <Ionicons name="chevron-back" size={24} style={{ position: 'absolute', top: 10, left: 10, color: Colors.onPrimary }} />
      </View>
      <View style={{ flex: 2 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>Classic Lasagne</Text>
          <Entypo name="dots-three-horizontal" size={20} style={{ marginTop: Spacings.m, color: Colors.text}} />
          </View>
        <View style={styles.recipeNutritionContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: Spacings.s}}>
            <SimpleLineIcons name="fire" size={20} style={ {marginRight: Spacings.s, color: Colors.primary} }/>
            <Text style={styles.recipeNutritionText}>500 kcal</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SimpleLineIcons name="clock" size={20} style={ {marginRight: Spacings.s, color: Colors.primary} }/>
            <Text style={styles.recipeNutritionText}>1 hr and 40 mins</Text>
          </View>
        </View>
        <Button
          title='Make it vegan!'
          style={styles.veganButton}
          textStyle={{ fontSize: Sizes.h3, color: Colors.onTertiary, marginRight: Spacings.m }}
          rightIcon={<Entypo name="leaf" size={20} color={Colors.onPrimary} />}
          onPress={() => {}} />
      </View>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: Spacings.m
      },
    title: {
        fontSize: Sizes.h1,
        color: Colors.text,
        width: '50%',
        marginBottom: Spacings.m,
        marginTop: Spacings.m,
    },
    recipeNutritionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacings.m,
    },
    recipeNutritionText: {
        fontSize: Sizes.h3,
        color: Colors.text
    },
    recipeDetailsContainer: {
      backgroundColor: Colors.gray_100,
      borderRadius: 10,
      marginBottom: Spacings.m,
    },
    ingredientsText: {
      fontSize: Sizes.l,
      color: Colors.text,
      marginBottom: Spacings.xs
    },
    veganButton: {
      backgroundColor: Colors.tertiary,
      borderRadius: 10,
      paddingVertical: Spacings.s,
      justifyContent: 'center',
      alignItems  : 'center',
    }
    
  });
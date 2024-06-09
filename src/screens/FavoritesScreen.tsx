import { View, StyleSheet, Text, FlatList } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, ParamListBase, useFocusEffect } from '@react-navigation/native';
import { useState, useContext, useCallback } from 'react';
import { Colors, Spacings, Sizes } from '@values';
import { RecipeCard } from '@components';
import { AuthContext, fetchFavoriteRecipes } from '@utils';

function HeaderComponent() {
  const insets = useSafeAreaInsets()

  return (
    <View style={{ marginTop: insets.top, paddingHorizontal: Spacings.m }}>
      <View style={[styles.titleContainer, { marginBottom: Spacings.l }]}>
        <Text style={[styles.title]}>Favorites</Text>
      </View>
    </View>
  )
}

interface FavoritesScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

export default function FavoritesScreen({ navigation }: FavoritesScreenProps) {
  const { session } = useContext(AuthContext);
  const [recipes, setRecipes] = useState<any>([]);

  useFocusEffect(
    useCallback(() => {
      const getFavoriteRecipes = async () => {
        try {
          if (session === null) {
            setRecipes([]);
            return;
          };

          const fetchedRecipes = await fetchFavoriteRecipes(session.user.id);
          setRecipes(fetchedRecipes);
        } catch (error) {
          console.log(error);
        }
      }

      getFavoriteRecipes();
    }, [session])
  );

  return (
    <SafeAreaView edges={['left', 'right']}>
      <FlatList
        ListHeaderComponent={
          <HeaderComponent />
        }
        data={recipes}
        numColumns={2}
        keyExtractor={item => item.Recipe.id.toString()}
        columnWrapperStyle={styles.cardsContainer}
        renderItem={({ item }: any) => (
          <RecipeCard recipe={item.Recipe} onPress={() => navigation.navigate('FS_Details', { recipeId: item.Recipe.id })} />
        )}
        ListEmptyComponent={
          <ListEmptyComponent session={session} />
        }
        style={{ height: '100%' }} />
    </SafeAreaView>
  );
};

function ListEmptyComponent({ session }: { session: any | null }) {
  return (
    <View style={styles.listEmptyContainer}>
      {session === null ? (
        <Text style={styles.listEmptyText}>
          You must be logged in to add a recipe to your favorites.
        </Text>
      ) : (
        <Text style={styles.listEmptyText}>
          You haven't added any recipes to your favorites yet. Start exploring and save your favorite ones!
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: Sizes.h1,
  },
  titleContainer: { 
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterIcon: {
    borderColor: Colors.secondary,
    borderWidth: 2,
    padding: 2
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: Spacings.m,
    marginBottom: Spacings.m
  },
  smallCardTextDetails: {
    color: Colors.text_light,
    fontSize: Sizes.m,
    marginRight: Spacings.xs
  },
  smallCardTextTitle: {
    color: Colors.text_light,
    fontSize: Sizes.h2,
    textAlignVertical: 'bottom'
  },
  listEmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listEmptyText: {
    color: Colors.text_dark,
    fontSize: Sizes.l,
    width: '80%',
    textAlign: 'center'
  }
});
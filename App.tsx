import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Colors } from '@values';
import { RootNavigator } from '@navigation';
import {
  AuthProvider,
  RecipesProvider,
  FiltersProvider,
  fetchRecipes,
  fetchIngredients,
  fetchRecipesWithIngredients,
  fetchCategories,
  fetchRecipesWithCategories,
} from '@utils'

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [initialRecipes, setInitialRecipes] = useState<any[]>([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState<any[]>([]);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [recipesWithIngredients, setRecipesWithIngredients] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [recipesWithCategories, setRecipesWithCategories] = useState<any[]>([]);

  useEffect(() => {
    async function prepare() {
      try {
        await fetchRecipes().then((data) => {
          setInitialRecipes(data);

          const indices = new Set<number>();
          while (indices.size < 5) {
            indices.add(Math.floor(Math.random() * data.length));
          }

          const randomRecipes = Array.from(indices).map(index => data[index]);
          setSuggestedRecipes(randomRecipes);
        });

        await fetchIngredients().then((data) => setIngredients(data));
        await fetchRecipesWithCategories().then((data) => setRecipesWithCategories(data));
        await fetchCategories().then((data) => setCategories(data));
        await fetchRecipesWithIngredients().then((data) => setRecipesWithIngredients(data));
      } catch (error) {
        console.log(error);
      } finally {
        setAppIsReady(true);
      };
    };

    prepare();
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <AuthProvider>
      <RecipesProvider initialRecipes={initialRecipes} suggestedRecipes={suggestedRecipes}>
        <FiltersProvider
          initialIngredients={ingredients}
          initialCategories={categories}
          initialRecipesWithIngredients={recipesWithIngredients}
          initialRecipesWithCategories={recipesWithCategories}>
          <SafeAreaProvider style={styles.container} onLayout={onLayoutRootView}>
            <NavigationContainer>
              <RootNavigator />
              <StatusBar style="dark" />
            </NavigationContainer>
          </SafeAreaProvider>
        </FiltersProvider>
      </RecipesProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

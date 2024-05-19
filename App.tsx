import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Colors } from '@values';
import { RootNavigator } from '@navigation';
import { AuthProvider, RecipesProvider, fetchRecipes } from '@utils'

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [initialRecipes, setInitialRecipes] = useState<any[]>([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState<any[]>([]);

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
        <SafeAreaProvider style={styles.container} onLayout={onLayoutRootView}>
          <NavigationContainer>
            <RootNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </SafeAreaProvider>
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

/* ===== SUPABASE ===== */
export { supabase } from './supabase';
export { 
  signInWithEmail,
  signUpWithEmail,
  signOut,
  fetchUser,
  updateUser,
  fetchRecipes,
  fetchRecipe,
  fetchRecipeDetails,
  fetchFavoriteRecipes,
  addFavorite,
  removeFavorite,
  checkIfFavorite,
  fetchMealPlans,
  addMealPlan,
  removeMealPlan,
  checkIfInMealPlan,
} from './api';

/* ===== CONTEXT API ===== */
export { AuthProvider, AuthContext } from './AuthContext';
export { RecipesProvider, RecipesContext } from './RecipesContext';
/* ===== SUPABASE ===== */
export { supabase } from './supabase';
export { 
  signInWithEmail,
  signUpWithEmail,
  signOut,
  fetchUser,
  updateUser,
  fetchRecipes,
  fetchRecipeDetails,
  fetchFavoriteRecipes,
  addFavorite,
  removeFavorite,
  checkIfFavorite,
} from './api';

/* ===== CONTEXT API ===== */
export { AuthProvider, AuthContext } from './AuthContext';
export { RecipesProvider, RecipesContext } from './RecipeContext';
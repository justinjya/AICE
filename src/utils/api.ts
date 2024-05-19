import { QueryData } from '@supabase/supabase-js'
import { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';

/* ===== AUTHENTICATION ===== */
/**
 * Sign in with email and password.
 *
 * This function sends a sign-in request to Supabase with the provided email and password.
 * If the sign-in request fails, it throws an error.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @throws Will throw an error if the sign-in request fails.
 */
export async function signInWithEmail(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) throw error;
};

/**
 * Sign up with email and password and insert the user's name into the 'User' table.
 *
 * This function sends a sign-up request to Supabase with the provided name, email, and password.
 * If the sign-up request is successful, it inserts the user's name into the 'User' table.
 * If the sign-up request or the insert operation fails, it throws an error.
 *
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns The session data of the signed-up user.
 * @throws Will throw an error if the sign-up request or the insert operation fails.
 */
export async function signUpWithEmail(name: string, email: string, password: string) {
  const { data: { session }, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) throw error;

  const { error: insertError } = await supabase
    .from('User')
    .insert({ name: name });
  if (insertError) throw insertError;

  return session;
};

/**
 * Sign out the current user.
 *
 * This function sends a sign-out request to Supabase.
 * If the sign-out request fails, it throws an error.
 *
 * @throws Will throw an error if the sign-out request fails.
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error;
}

/**
 * Fetch the user associated with the given session from the 'User' table.
 *
 * This function sends a query to Supabase to fetch the user whose 'auth_id' matches the ID of the user associated with the given session.
 * It then returns the fetched user.
 * If the query fails, it throws an error.
 *
 * @param {Session} session - The session of the user.
 * @returns The user associated with the given session.
 * @throws Will throw an error if the query fails.
 */
export async function fetchUser(session: Session) {
  const { data: user, error } = await supabase
    .from('User')
    .select('name')
    .eq('id', session.user.id)
    .single();
  if (error) throw error;

  return user;
};

/**
 * Update the name of the user associated with the given session in the 'User' table.
 *
 * This function sends an update query to Supabase to change the name of the user whose 'id' matches the ID of the user associated with the given session.
 * It then returns nothing.
 * If the query fails, it throws an error.
 *
 * @param {Session} session - The session of the user.
 * @param {string} name - The new name of the user.
 * @throws Will throw an error if the query fails.
 */
export async function updateUser(session: Session, name: string) {
  const { error } = await supabase
    .from('User')
    .update({ name: name })
    .eq('id', session.user.id);
  if (error) throw error;
}


/* ===== RECIPES ===== */
/**
 * Function to fetch all recipes from the 'Recipe' table in Supabase.
 * 
 * @returns A promise that resolves to the fetched recipes.
 * @throws If there's an error executing the query.
 */
export async function fetchRecipes() {
  const { data: recipes, error } = await supabase
    .from('Recipe')
    .select(`
      id,
      name,
      calories,
      duration,
      vegan_recipe_id,
      imageUrl
    `);
  if (error) throw error;

  return recipes;
};

/**
 * Function to fetch detailed information about a specific recipe from the 'Recipe' table in Supabase.
 * 
 * @param recipeId - The id of the recipe to fetch.
 * @returns A promise that resolves to the fetched recipe details.
 * @throws If there's an error executing the query.
 */
export async function fetchRecipeDetails(recipeId: number) {
  const { data: recipeDetails, error } = await supabase
    .from('Recipe')
    .select(`
      id,
      name,
      calories,
      duration,
      vegan_recipe_id,
      imageUrl,
      Recipe_Ingredient_Measurement (
        Ingredient (
          name
        ),
        Measurement (
          measurement
        )
      ),
      Instruction (
        id,
        instruction
      )
    `)
    .eq('id', recipeId)
    .single();
  if (error) throw error;

  return recipeDetails;
};


/* ===== FAVORITES ===== */
/**
 * Fetches the favorite recipes for a specific user.
 *
 * @param userId - The ID of the user.
 * @returns The favorite recipes of the user.
 * @throws If there is an error with the query.
 */
export async function fetchFavoriteRecipes(userId: string) {
  const { data: favoriteRecipes, error } = await supabase
    .from('Favorite_Recipe')
    .select(`
      Recipe (
        id,
        name,
        calories,
        duration,
        vegan_recipe_id,
        imageUrl
      )
    `)
    .eq('user_id', userId);
  if (error) throw error;

  return favoriteRecipes;
};

/**
 * Adds a recipe to a user's favorites.
 *
 * @param recipeId - The ID of the recipe.
 * @param userId - The ID of the user.
 * @throws If there is an error with the query.
 */
export async function addFavorite(recipeId: number, userId: string) {
  const { error } = await supabase
    .from('Favorite_Recipe')
    .insert({ recipe_id: recipeId, user_id: userId });
  if (error) throw error;
};

/**
 * Removes a favorite recipe for a specific user.
 *
 * @param userId - The ID of the user.
 * @param recipeId - The ID of the recipe.
 * @throws If there is an error with the query.
 */
export async function removeFavorite(recipeId: number, userId: string) {
  const { error } = await supabase
    .from('Favorite_Recipe')
    .delete()  
    .eq('recipe_id', recipeId)
    .eq('user_id', userId);
  if (error) throw error;
};

/**
 * Checks if a recipe is a favorite for a specific user.
 *
 * @param userId - The ID of the user.
 * @param recipeId - The ID of the recipe.
 * @returns True if the recipe is a favorite for the user, false otherwise.
 * @throws If there is an error with the query.
 */
export async function checkIfFavorite(recipeId: number, userId: string) {
  const { data, error } = await supabase
    .from('Favorite_Recipe')
    .select('recipe_id')
    .eq('recipe_id', recipeId).eq('user_id', userId);
  if (error) throw error;

  return data.length > 0;
};

/* ===== MEAL PLAN ===== */
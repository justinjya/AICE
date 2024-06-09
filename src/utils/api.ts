import { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';

/* ===== AUTHENTICATION ===== */
export async function signInWithEmail(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) throw error;
};

export async function signUpWithEmail(name: string, email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) throw error;

  const user = data.user;
  if (user) {
    const { error: insertError } = await supabase
      .from('User')
      .insert({ id: user.id, name: name });
    if (insertError) throw insertError;
  }
};

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error;
}

export async function fetchUser(session: Session) {
  const { data: user, error } = await supabase
    .from('User')
    .select('name')
    .eq('id', session.user.id)
    .single();
  if (error) throw error;

  return user;
};

export async function updateUser(session: Session, name: string) {
  const { error } = await supabase
    .from('User')
    .update({ name: name })
    .eq('id', session.user.id);
  if (error) throw error;
}


/* ===== RECIPES ===== */
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

export async function fetchIngredients() {
  const { data: ingredients, error } = await supabase
    .from('Ingredient')
    .select('*');
  if (error) throw error;

  return ingredients;
}

export async function fetchRecipesWithIngredients() {
  const { data: recipes, error } = await supabase
    .from('Recipe_Ingredient_Measurement')
    .select('*');
  if (error) throw error;

  return recipes;
}

export async function fetchCategories() {
  const { data: categories, error } = await supabase
    .from('Category')
    .select('*');
  if (error) throw error;

  return categories;
}

export async function fetchRecipesWithCategories() {
  const { data: recipes, error } = await supabase
    .from('Recipe_Category')
    .select('*');
  if (error) throw error;

  return recipes;
}

export async function fetchRecipe(recipeId: number) {
  const { data: recipe, error } = await supabase
    .from('Recipe')
    .select('*')
    .eq('id', recipeId)
    .single();
  if (error) throw error;

  return recipe;
};

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
      Recipe_Category (
        Category (
          name
        )
      ),
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

export async function addFavorite(recipeId: number, session: Session) {
  const { error } = await supabase
    .from('Favorite_Recipe')
    .insert({ recipe_id: recipeId, user_id: session.user.id });
  if (error) throw error;
};

export async function removeFavorite(recipeId: number, session: Session) {
  const { error } = await supabase
    .from('Favorite_Recipe')
    .delete()  
    .eq('recipe_id', recipeId)
    .eq('user_id', session.user.id);
  if (error) throw error;
};

export async function checkIfFavorite(recipeId: number, session: Session) {
  const { data, error } = await supabase
    .from('Favorite_Recipe')
    .select('recipe_id')
    .eq('recipe_id', recipeId).eq('user_id', session.user.id);
  if (error) throw error;

  return data.length > 0;
};

/* ===== MEAL PLAN ===== */
export async function fetchMealPlans(session: Session) {
  const { data: mealPlans, error } = await supabase
    .from('Meal_Plan')
    .select(`
      id,
      date,
      schedule,
      Recipe(
        id,
        name,
        calories,
        duration,
        vegan_recipe_id,
        imageUrl
      )
    `)
    .eq('user_id', session.user.id);
  if (error) throw error;

  return mealPlans;
};

export async function addMealPlan(recipeId: number, session: Session, schedule: string, date: Date) {
  const dateString = date.toISOString().split('.')[0];

  const { error } = await supabase
    .from('Meal_Plan')
    .insert({
      recipe_id: recipeId,
      user_id: session.user.id,
      schedule: schedule,
      date: dateString
    });
  if (error) throw error;
};

export async function removeMealPlan(recipeId: number, session: Session) {
  const { error } = await supabase
    .from('Meal_Plan')
    .delete()
    .eq('recipe_id', recipeId)
    .eq('user_id', session.user.id);
  if (error) throw error;
};

export async function checkIfInMealPlan(recipeId: number, session: Session) {
  const { data, error } = await supabase
    .from('Meal_Plan')
    .select('recipe_id')
    .eq('recipe_id', recipeId)
    .eq('user_id', session.user.id);
  if (error) throw error;

  return data.length > 0;
};
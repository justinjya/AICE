import React, { createContext, useState } from 'react';

interface RecipesContextProps {
  recipes: any[];
  setRecipes: React.Dispatch<React.SetStateAction<any[]>>;
  suggestions: any[];
  setSuggestions: React.Dispatch<React.SetStateAction<any[]>>;
  mealPlans: any[];
  setMealPlans: React.Dispatch<React.SetStateAction<any[]>>;
}

export const RecipesContext = createContext<RecipesContextProps>({
  recipes: [], setRecipes: () => {},
  suggestions: [], setSuggestions: () => {},
  mealPlans: [], setMealPlans: () => {},
});

interface RecipesProviderProps {
  children: React.ReactNode;
  initialRecipes: any[];
  suggestedRecipes: any[];
}

export const RecipesProvider: React.FC<RecipesProviderProps> = ({ children, initialRecipes, suggestedRecipes }) => {
  const [recipes, setRecipes] = useState<any[]>(initialRecipes);
  const [suggestions, setSuggestions] = useState<any[]>(suggestedRecipes);
  const [mealPlans, setMealPlans] = useState<any[]>([]);

  return (
    <RecipesContext.Provider value={{ recipes, setRecipes, suggestions, setSuggestions, mealPlans, setMealPlans }}>
      {children}
    </RecipesContext.Provider>
  );
};
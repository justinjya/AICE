import React, { createContext, useState } from 'react';

export type FiltersType = {
  categories: number[];
  ingredients: number[];
  maxCalories: number | null;
  maxTime: number | null;
  minCalories: number | null;
  minTime: number | null;
};

interface FiltersContextProps {
  ingredients: any[];
  setIngredients: React.Dispatch<React.SetStateAction<any[]>>;
  categories: any[];
  setCategories: React.Dispatch<React.SetStateAction<any[]>>;
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  recipesWithIngredients: any[];
  recipesWithCategories: any[];
}

export const FiltersContext = createContext<FiltersContextProps>({
  ingredients: [], setIngredients: () => {},
  categories: [], setCategories: () => {},
  filters: { 
    categories: [],
    ingredients: [],
    minCalories: null,
    maxCalories: null,
    minTime: null,
    maxTime: null
  }, setFilters: () => {},
  recipesWithIngredients: [],
  recipesWithCategories: [],
});

interface FiltersProviderProps {
  children: React.ReactNode;
  initialIngredients: any[];
  initialCategories: any[];
  initialRecipesWithIngredients: any[];
  initialRecipesWithCategories: any[];
}

export const FiltersProvider: React.FC<FiltersProviderProps> = ({ 
  children, 
  initialIngredients, 
  initialCategories, 
  initialRecipesWithIngredients,
  initialRecipesWithCategories
}) => {
  const [ingredients, setIngredients] = useState<any[]>(initialIngredients);
  const [categories, setCategories] = useState<any[]>(initialCategories);
  const [filters, setFilters] = useState<FiltersType>({ 
    categories: [],
    ingredients: [],
    minCalories: null,
    maxCalories: null,
    minTime: null,
    maxTime: null
  });
  const [recipesWithIngredients] = useState<any[]>(initialRecipesWithIngredients);
  const [recipesWithCategories] = useState<any[]>(initialRecipesWithCategories);

  return (
    <FiltersContext.Provider value={{
      ingredients, setIngredients,
      categories, setCategories,
      filters, setFilters,
      recipesWithIngredients,
      recipesWithCategories
    }}>
      {children}
    </FiltersContext.Provider>
  );
};
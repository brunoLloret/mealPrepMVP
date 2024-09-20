import React, { useState, useEffect } from "react";
import { Recipe } from "../types/mealTypes";

// Define all necessary types and interfaces
export type DayOfTheWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface Meal {
  mealId: string;
  mealName: "Breakfast" | "Lunch" | "Dinner" | "Snack" | "Special";
  recipes: Recipe[];
}

export interface Recipe {
  name: string;
  URL?: string;
  instructions: string[];
  notes: string;
  RecipeIngredients: RecipeIngredient[];
  servings: number;
}

export interface Ingredient {
  name: string;
  category: Category;
  notes: string;
}

export interface RecipeIngredient {
  ingredient: Ingredient;
  notes: string;
  amount: number;
  unit: string;
}

export type Category =
  | "Fruit"
  | "Vegetable"
  | "Meat"
  | "Fish"
  | "Dairy"
  | "Grain"
  | "Spice"
  | "Herb"
  | "Fats and Oils"
  | "Eggs"
  | "Flour"
  | "Sugar"
  | "Liquid"
  | "Other";

export interface Day {
  dayOfTheWeek: DayOfTheWeek;
  Meals: Meal[];
}

export interface Cart {
  recipeIngredients: RecipeIngredient[];
}

const colorPalette = [
  "bg-lime-300",
  "bg-rose-300",
  "bg-blue-300",
  "bg-green-300",
  "bg-yellow-300",
  "bg-purple-300",
  "bg-teal-300",
];

// Full RecipeComponent
const RecipeComponent: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
      <RecipeHeader recipe={recipe} />
      <RecipeIngredients recipe={recipe} />
      <RecipeInstructions recipe={recipe} />
    </div>
  );
};

const RecipeHeader: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <div className="bg-lime-200 p-2 mb-2 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold">{recipe.name}</h3>
    </div>
  );
};

const RecipeIngredients: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <div className="bg-green-500 p-4 rounded-lg mb-4">
      <h4 className="text-lg font-semibold mb-2">Ingredients</h4>
      <ul className="list-disc pl-5">
        {recipe.RecipeIngredients.map((recipeIngredient, index) => (
          <li key={index} className="mb-2">
            <span>
              {recipeIngredient.ingredient.name} - {recipeIngredient.amount}{" "}
              {recipeIngredient.unit}
            </span>
            {recipeIngredient.notes && (
              <span className="text-sm italic">
                {" "}
                ({recipeIngredient.notes})
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const RecipeInstructions: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <div className="bg-sky-300 p-4 rounded-lg">
      <h4 className="text-lg font-semibold mb-2">Instructions</h4>
      <ol className="list-decimal pl-5">
        {recipe.instructions.map((instruction, index) => (
          <li key={index} className="mb-1">
            {instruction}
          </li>
        ))}
      </ol>
      {recipe.notes && <p className="mt-4 italic">Note: {recipe.notes}</p>}
    </div>
  );
};

interface AllRecipesProps {
  recipes: Recipe[];
  onDeleteRecipe: (recipe: Recipe) => void;
}

const AllRecipes: React.FC<AllRecipesProps> = ({ recipes, onDeleteRecipe }) => {
  const [showRecipePopup, setShowRecipePopup] = useState<boolean>(false);
  const [displayRecipe, setDisplayRecipe] = useState<Recipe | null>(null);
  const [popupColorClass, setPopupColorClass] = useState<string>("");

  const handleRecipe = (recipe: Recipe, colorClass: string) => {
    setShowRecipePopup(true);
    setDisplayRecipe(recipe);
    setPopupColorClass(colorClass);
  };

  const closePopup = () => {
    setShowRecipePopup(false);
    setDisplayRecipe(null);
    setPopupColorClass("");
  };

  const handleDelete = () => {
    if (displayRecipe) {
      onDeleteRecipe(displayRecipe);
      closePopup();
    }
  };

  return (
    <>
      <div className="mt-8">
        <ul>
          {recipes.map((recipe, index) => {
            const colorClass = colorPalette[index % colorPalette.length];
            return (
              <li key={index} className="p-1">
                <button
                  className={`${colorClass} font-mono text-yellow-950 w-full text-left px-2 py-1 rounded`}
                  onClick={() => handleRecipe(recipe, colorClass)}
                >
                  {recipe.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {showRecipePopup && displayRecipe && (
        <div
          className={`fixed font-mono inset-0 bg-purple-900 bg-opacity-50 flex items-center justify-center`}
        >
          <div
            className={`${popupColorClass} p-4 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
          >
            <RecipeComponent recipe={displayRecipe} />
            <div className="mt-4 flex justify-between">
              <button
                onClick={closePopup}
                className="bg-red-500 text-white font-bold font-mono px-4 py-2 rounded"
              >
                Close
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-700 text-white font-bold font-mono px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllRecipes;

// option all together in rows

//<div>
// <ul>
// {recipes.map((recipe, index) => (
//   <button onClick={() => handleRecipe}>
//     <li key={index}>{recipe.name}</li>
//   </button>
// ))}
// </ul>
// </div>

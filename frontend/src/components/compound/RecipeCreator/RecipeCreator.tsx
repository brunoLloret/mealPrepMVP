// THIS IS THE MAIN COMPONENT FOR RECIPE CREATOR
// its outputs should be:

// **** RECIPE ****
// type Recipe = {
//     name: string;
//     instructions: string[];
//     notes: string;
//     RecipeIngredients: RecipeIngredient[];
//   };

//   type RecipeIngredient = {
//     ingredient: {
//       // Details about the ingredient (e.g., name, type)
//     };
//     amount: number;
//     unit: string;
//   };

// **** SHOPPING LIST ****
// type ShoppingList = {
//     ingredients: Ingredient[];
//   };

//   type Ingredient = {
//     // Details about the ingredient (e.g., name, amount, unit)
//   };

import React, { useState } from "react";

// Interfaces and types
export interface Recipe {
  name: string;
  URL?: string;
  instructions: string[];
  notes: string;
  servings: number;
  RecipeIngredients: RecipeIngredient[];
}

export interface Ingredient {
  name: string;
  category: Category;
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

export interface RecipeIngredient {
  ingredient: Ingredient;
  notes: string;
  amount: number;
  unit: string;
}

export interface ShoppingList {
  ingredients: Ingredient[];
}

// API service
import recipeService from "../../../../API/recipeService";

// Popups
import IngredientPopup from "../IngredientPopup";
import StepPopup from "../StepPopup";

const RecipeCreator: React.FC = () => {
  const [title, setTitle] = useState<string>("add title");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [servings, setServings] = useState<number>(1);

  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [showIngredientPopup, setShowIngredientPopup] =
    useState<boolean>(false);
  const [showStepPopup, setShowStepPopup] = useState<boolean>(false);

  const [ingredientToEdit, setIngredientToEdit] =
    useState<RecipeIngredient | null>(null);
  const [stepToEdit, setStepToEdit] = useState<{
    index: number;
    step: string;
  } | null>(null);

  const { addRecipe } = recipeService;

  const handleSaveClick = (): void => {
    setTitle(inputValue);
    setIsEditing(false);
  };

  const handleEditClick = (): void => {
    setInputValue(title);
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleAddIngredient = (ingredient: RecipeIngredient) => {
    setIngredients([...ingredients, ingredient]);
    setShowIngredientPopup(false);
  };

  const handleRemoveIngredient = (index: number): void => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleEditIngredient = (index: number) => {
    setIngredientToEdit(ingredients[index]);
    setShowIngredientPopup(true);
  };

  const handleUpdateIngredient = (updatedIngredient: RecipeIngredient) => {
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient === ingredientToEdit ? updatedIngredient : ingredient
      )
    );
    setIngredientToEdit(null);
    setShowIngredientPopup(false);
  };

  const handleAddStep = (step: string) => {
    setSteps((prevSteps) => [...prevSteps, step]);
    setShowStepPopup(false);
  };

  const handleRemoveStep = (index: number): void => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleEditStep = (index: number) => {
    setStepToEdit({ index, step: steps[index] });
    setShowStepPopup(true);
  };

  const handleUpdateStep = (index: number, updatedStep: string) => {
    setSteps(steps.map((step, i) => (i === index ? updatedStep : step)));
    setStepToEdit(null);
    setShowStepPopup(false);
  };

  const handleSaveRecipe = (): void => {
    const recipe: Recipe = {
      name: title,
      instructions: steps,
      notes: notes,
      servings: servings,
      RecipeIngredients: ingredients,
    };

    const shoppingList: ShoppingList = {
      ingredients: ingredients.map((ri) => ri.ingredient),
    };

    addRecipe(recipe);

    setShowIngredientPopup(false);
    setShowStepPopup(false);
  };

  const resetForm = () => {
    setTitle("add title");
    setIsEditing(false);
    setInputValue("");
    setNotes("");
    setIngredients([]);
    setSteps([]);
  };

  const handlePopupButtonClick = (action: string) => {
    switch (action) {
      case "seeRecipe":
        console.log("Navigate to recipe view");
        break;
      case "seeShoppingList":
        console.log("Navigate to shopping list view");
        break;
      case "goBack":
        console.log("Navigate back to recipes");
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="p-4 min-h-screen flex flex-col bg-sky-400 gap-4">
        <div className="relative flex items-center h-12 mb-4">
          <div className="absolute inset-0 flex items-center">
            {isEditing ? (
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="bg-sky-300 border-1 border-gray-300 rounded-xl px-3 font-semibold text-sky-700 h-full w-64"
              />
            ) : (
              <h1 className="text-lg text-sky-900 font-bold font-mono h-full flex items-center">
                {title}
              </h1>
            )}
          </div>
          <div className="absolute right-0 flex items-center">
            {isEditing ? (
              <button
                onClick={handleSaveClick}
                className="bg-orange-400 font-mono font-bold text-white rounded-full px-4 py-2"
              >
                save
              </button>
            ) : (
              <button
                onClick={handleEditClick}
                className="font-mono font-semibold text-md rounded-full bg-yellow-300 w-20 text-yellow-700 px-4 py-2 border-2"
              >
                edit
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-sky-900 font-bold font-mono">
              ingredients
            </h2>
            <button
              onClick={() => setShowIngredientPopup(true)}
              className="bg-emerald-200 font-mono font-semibold text-emerald-800 rounded-full w-20 px-4 py-2 border-2"
            >
              add
            </button>
          </div>
          <ul className="list-disc pl-5">
            {ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="flex justify-between items-center font-mono"
              >
                <span className="text-sky-800">
                  {ingredient.ingredient.name} - {ingredient.amount}{" "}
                  {ingredient.unit}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditIngredient(index)}
                    className="bg-fuchsia-400 font-mono rounded-full py-2 px-4"
                  >
                    edit
                  </button>
                  <button
                    onClick={() => handleRemoveIngredient(index)}
                    className="text-fuchsia-400 font-mono rounded-full py-2 px-4"
                  >
                    remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-sky-900 font-bold font-mono">steps</h2>
            <button
              onClick={() => setShowStepPopup(true)}
              className="bg-blue-500 font-mono font-semibold text-white rounded-full px-4 py-2 w-20 border-2"
            >
              add
            </button>
          </div>
          <ol className="list-decimal pl-5">
            {steps.map((step, index) => (
              <li key={index} className="flex justify-between items-center">
                <span className="font-mono text-md"> ◗ {step}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditStep(index)}
                    className="bg-fuchsia-400 font-mono rounded-full py-2 px-4"
                  >
                    edit
                  </button>
                  <button
                    onClick={() => handleRemoveStep(index)}
                    className="text-fuchsia-400 font-mono rounded-full py-2 px-4"
                  >
                    remove
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* New Servings section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-sky-900 font-bold font-mono">
              servings
            </h2>
            <input
              type="number"
              value={servings}
              onChange={(e) => setServings(Number(e.target.value))}
              className="bg-sky-300 border-1 border-gray-300 rounded-xl px-3 font-semibold text-sky-700 h-8 w-20"
            />
          </div>
        </div>

        <div className="flex flex-col flex-grow gap-4">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg text-sky-900 font-bold py-4 font-mono">
              notes
            </h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-sky-300 border-1 border-gray-300 rounded-xl text-sky-900 w-full h-40 overflow-auto"
            />
          </div>
          <button
            onClick={handleSaveRecipe}
            className="bg-fuchsia-500 font-mono font-semibold text-white rounded-full px-4 py-2 mt-2 border-8"
          >
            save recipe!
          </button>
        </div>

        {showIngredientPopup && (
          <IngredientPopup
            onClose={() => {
              setShowIngredientPopup(false);
              setIngredientToEdit(null);
            }}
            onAdd={handleAddIngredient}
            onUpdate={handleUpdateIngredient}
            ingredientToEdit={ingredientToEdit}
          />
        )}

        {showStepPopup && (
          <StepPopup
            onClose={() => {
              setShowStepPopup(false);
              setStepToEdit(null);
            }}
            onAdd={handleAddStep}
            onUpdate={handleUpdateStep}
            stepToEdit={stepToEdit}
          />
        )}

        <div className="flex justify-around mt-4">
          <button
            onClick={() => handlePopupButtonClick("seeRecipe")}
            className="bg-sky-500 font-mono font-semibold text-white rounded-full px-4 py-2 border-2"
          >
            see recipe
          </button>
          <button
            onClick={() => handlePopupButtonClick("seeShoppingList")}
            className="bg-green-500 font-mono font-semibold text-white rounded-full px-4 py-2 border-2"
          >
            see shopping list
          </button>
          <button
            onClick={() => handlePopupButtonClick("goBack")}
            className="bg-yellow-500 font-mono font-semibold text-white rounded-full px-4 py-2 border-2"
          >
            go back
          </button>
        </div>
      </div>
    </>
  );
};

export default RecipeCreator;

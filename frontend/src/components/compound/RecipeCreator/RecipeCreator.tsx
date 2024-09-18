import React, { useState } from "react";
import recipeService from "../../../../API/recipeService";
import IngredientPopup from "../IngredientPopup";
import StepPopup from "../StepPopup";

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
  const [showRecipePopup, setShowRecipePopup] = useState<boolean>(false);

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
    setShowRecipePopup(true);
  };

  const resetForm = () => {
    setTitle("add title");
    setIsEditing(false);
    setInputValue("");
    setNotes("");
    setIngredients([]);
    setSteps([]);
    setServings(1);
  };

  const handleDeleteRecipe = (): void => {
    console.log("Deleting recipe");
    setShowRecipePopup(false);
    resetForm();
  };

  const handleGoBackToRecipes = (): void => {
    console.log("Navigating back to recipes");
    setShowRecipePopup(false);
  };

  return (
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

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg text-sky-900 font-bold font-mono">servings</h2>
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
          onEditIngredient={handleUpdateIngredient}
          ingredientToEdit={ingredientToEdit}
        />
      )}

      {showStepPopup && (
        <StepPopup
          onClose={() => {
            setShowStepPopup(false);
            setStepToEdit(null);
          }}
          onAddStep={handleAddStep}
          onUpdateStep={handleUpdateStep}
          stepToEdit={stepToEdit}
        />
      )}

      {showRecipePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p>
              <strong>Servings:</strong> {servings}
            </p>
            <h3 className="font-bold mt-4">Ingredients:</h3>
            <ul className="list-disc pl-5">
              {ingredients.map((ing, index) => (
                <li key={index}>
                  {ing.amount} {ing.unit} {ing.ingredient.name}
                </li>
              ))}
            </ul>
            <h3 className="font-bold mt-4">Instructions:</h3>
            <ol className="list-decimal pl-5">
              {steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
            <p className="mt-4">
              <strong>Notes:</strong> {notes}
            </p>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleDeleteRecipe}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={handleGoBackToRecipes}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Go back to my recipes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCreator;

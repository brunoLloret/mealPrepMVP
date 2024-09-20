import React, { useState } from "react";
import { Recipe, RecipeIngredient, Ingredient } from "../types/mealTypes";
import IngredientPopup from "../IngredientPopup";
import StepPopup from "../StepPopup";

interface RecipeCreatorProps {
  onAddRecipe: (newRecipe: Recipe) => void;
}

const RecipeCreator: React.FC<RecipeCreatorProps> = ({ onAddRecipe }) => {
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

    onAddRecipe(recipe);
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
    resetForm();
  };

  return (
    <div className="p-4 min-h-screen flex flex-col bg-lime-200 gap-4 font-mono">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="relative flex items-center h-12 mb-4">
          <div className="flex-grow mr-2">
            {isEditing ? (
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="bg-green-200 border-2 border-green-500 rounded-lg px-3 font-semibold text-green-700 h-full w-full"
              />
            ) : (
              <h1 className="text-lg text-green-800 font-bold h-full flex items-center">
                {title}
              </h1>
            )}
          </div>
          <div className="flex-shrink-0">
            {isEditing ? (
              <button
                onClick={handleSaveClick}
                className="bg-blue-500 font-bold text-white rounded-full px-3 py-1 text-sm"
              >
                save
              </button>
            ) : (
              <button
                onClick={handleEditClick}
                className="font-semibold text-sm rounded-full bg-yellow-300 text-yellow-700 px-3 py-1 border-2 border-yellow-400"
              >
                edit
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-green-800 font-bold">ingredients</h2>
            <button
              onClick={() => setShowIngredientPopup(true)}
              className="bg-blue-300 font-semibold text-blue-800 rounded-full px-3 py-1 text-sm border-2 border-blue-400"
            >
              add
            </button>
          </div>
          <ul className="list-disc pl-5">
            {ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-green-100 p-2 rounded-lg mb-2"
              >
                <span className="text-green-800 text-sm mr-2">
                  {ingredient.ingredient.name} - {ingredient.amount}{" "}
                  {ingredient.unit}
                </span>
                <div className="flex space-x-1 flex-shrink-0">
                  <button
                    onClick={() => handleEditIngredient(index)}
                    className="bg-yellow-400 font-semibold text-yellow-800 rounded-full py-1 px-2 text-xs"
                  >
                    edit
                  </button>
                  <button
                    onClick={() => handleRemoveIngredient(index)}
                    className="bg-red-400 font-semibold text-red-800 rounded-full py-1 px-2 text-xs"
                  >
                    remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-green-800 font-bold">steps</h2>
            <button
              onClick={() => setShowStepPopup(true)}
              className="bg-blue-300 font-semibold text-blue-800 rounded-full px-3 py-1 text-sm border-2 border-blue-400"
            >
              add
            </button>
          </div>
          <ol className="list-decimal pl-5">
            {steps.map((step, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-blue-100 p-2 rounded-lg mb-2"
              >
                <span className="text-blue-800 text-sm mr-2">◗ {step}</span>
                <div className="flex space-x-1 flex-shrink-0">
                  <button
                    onClick={() => handleEditStep(index)}
                    className="bg-yellow-400 font-semibold text-yellow-800 rounded-full py-1 px-2 text-xs"
                  >
                    edit
                  </button>
                  <button
                    onClick={() => handleRemoveStep(index)}
                    className="bg-red-400 font-semibold text-red-800 rounded-full py-1 px-2 text-xs"
                  >
                    remove
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-green-800 font-bold">servings</h2>
            <input
              type="number"
              value={servings}
              onChange={(e) => setServings(Number(e.target.value))}
              className="bg-green-200 border-2 border-green-500 rounded-lg px-3 font-semibold text-green-700 h-8 w-20"
            />
          </div>
        </div>

        <div className="flex flex-col flex-grow gap-4 mt-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg text-green-800 font-bold">notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-green-200 border-2 border-green-500 rounded-lg text-green-800 w-full h-40 p-2"
            />
          </div>
          <button
            onClick={handleSaveRecipe}
            className="bg-purple-500 font-semibold text-white rounded-full px-4 py-2 mt-4 border-4 border-purple-600 w-full"
          >
            save recipe!
          </button>
        </div>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-lime-200 to-green-300 p-6 rounded-lg max-w-md w-full shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-purple-800 border-b-2 border-purple-500 pb-2">
              {title}
            </h2>
            <div className="bg-yellow-100 rounded-lg p-3 mb-4">
              <p className="text-yellow-800 font-semibold">
                <span className="text-yellow-600">Servings:</span> {servings}
              </p>
            </div>
            <div className="bg-blue-100 rounded-lg p-4 mb-4">
              <h3 className="font-bold text-blue-800 mb-2 text-lg">
                Ingredients:
              </h3>
              <ul className="list-disc pl-5 text-blue-700 space-y-1">
                {ingredients.map((ing, index) => (
                  <li key={index} className="bg-blue-50 rounded p-1">
                    <span className="font-semibold">
                      {ing.amount} {ing.unit}
                    </span>{" "}
                    {ing.ingredient.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-green-100 rounded-lg p-4 mb-4">
              <h3 className="font-bold text-green-800 mb-2 text-lg">
                Instructions:
              </h3>
              <ol className="list-decimal pl-5 text-green-700 space-y-2">
                {steps.map((step, index) => (
                  <li key={index} className="bg-green-50 rounded p-2">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            {notes && (
              <div className="bg-pink-100 rounded-lg p-4 mb-4">
                <h3 className="font-bold text-pink-800 mb-2 text-lg">Notes:</h3>
                <p className="text-pink-700 italic">{notes}</p>
              </div>
            )}
            <div className="flex justify-between mt-6">
              <button
                onClick={handleDeleteRecipe}
                className="bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600 transition-colors duration-200"
              >
                Delete Recipe
              </button>
              <button
                onClick={handleGoBackToRecipes}
                className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-600 transition-colors duration-200"
              >
                Back to Recipes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCreator;

import React, { useState, useEffect } from "react";
import { RecipeIngredient, Category } from "../../../../shared/interfaces";

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
  // notes: string;
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

interface IngredientPopupProps {
  onClose: () => void;
  onAdd: (ingredient: RecipeIngredient) => void;
  onEditIngredient: (ingredient: RecipeIngredient) => void;
  ingredientToEdit: RecipeIngredient | null;
}

const IngredientPopup: React.FC<IngredientPopupProps> = ({
  onClose,
  onAdd,
  onEditIngredient,
  ingredientToEdit,
}) => {
  console.log(
    "IngredientPopup rendered with ingredientToEdit:",
    ingredientToEdit
  );

  const [ingredientInput, setIngredientInput] = useState<string>(
    ingredientToEdit?.ingredient.name || ""
  );
  const [amountInput, setAmountInput] = useState<string>(
    ingredientToEdit?.amount.toString() || ""
  );
  const [unitInput, setUnitInput] = useState<string>(
    ingredientToEdit?.unit || "unit"
  );
  const [categoryInput, setCategoryInput] = useState<Category>(
    ingredientToEdit?.ingredient.category || "Fruit"
  );

  const [name, setName] = useState(ingredientToEdit?.ingredient.name || "");
  const [amount, setAmount] = useState(
    ingredientToEdit?.amount.toString() || ""
  );
  const [unit, setUnit] = useState(ingredientToEdit?.unit || "");
  useEffect(() => {
    console.log("useEffect triggered with ingredientToEdit:", ingredientToEdit);
    if (ingredientToEdit) {
      console.log("Updating state with ingredientToEdit");
      setIngredientInput(ingredientToEdit.ingredient.name);
      setAmountInput(ingredientToEdit.amount.toString());
      setUnitInput(ingredientToEdit.unit);
      setCategoryInput(ingredientToEdit.ingredient.category);
    } else {
      console.log("Resetting state (no ingredientToEdit)");
      setIngredientInput("");
      setAmountInput("");
      setUnitInput("unit");
      setCategoryInput("Fruit");
    }
  }, [ingredientToEdit]);

  const recognizeUnit = (input: string) => {
    const unitRegex = /^([\d./]+)\s*([a-zA-Z]+|)(.*)$/;
    const match = input.match(unitRegex);

    if (match) {
      const [, amount, unit, ingredientName] = match;
      setAmountInput(amount);
      setUnitInput(unit || "unit");
      setIngredientInput(ingredientName.trim());
    } else {
      setIngredientInput(input);
    }
  };

  const handleIngredientInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    recognizeUnit(e.target.value);
  };

  const handleSubmit = () => {
    if (ingredientInput.trim() !== "" && amountInput.trim() !== "") {
      const updatedIngredient: RecipeIngredient = {
        ingredient: {
          name: ingredientInput,
          category: categoryInput,
        },
        amount: parseFloat(amountInput),
        unit: unitInput,
        notes: "",
      };

      console.log("Submitting ingredient:", updatedIngredient);
      if (ingredientToEdit) {
        onEditIngredient(updatedIngredient);
      } else {
        onAdd(updatedIngredient);
      }

      onClose();
    }
  };

  return (
    <div className="fixed font-mono inset-0 flex items-center justify-center bg-violet-800 bg-opacity-50">
      <div className="bg-lime-100 h-96 p-8 rounded-lg shadow-lg">
        <h3 className="text-lg mb-2">
          {ingredientToEdit ? "edit ingredient" : "add ingredient"}
        </h3>
        <input
          type="text"
          placeholder="enter a name"
          value={ingredientInput}
          onChange={handleIngredientInputChange}
          className="border border-gray-300 p-2 rounded text-black w-full mb-2"
        />
        <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 mb-2">
          <input
            type="text"
            placeholder="amount"
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
            className="border border-gray-300 p-2 rounded text-black w-full sm:w-1/3"
          />
          <select
            value={unitInput}
            onChange={(e) => setUnitInput(e.target.value)}
            className="border border-gray-300 p-2 rounded text-black w-full sm:w-1/3"
          >
            <option value="unit">unit</option>
            <option value="cup">cup</option>
            <option value="tbsp">tbsp</option>
            <option value="tsp">tsp</option>
            <option value="oz">oz</option>
            <option value="g">grms</option>
            <option value="lb">lb</option>
            <option value="ml">ml</option>
            <option value="l">l</option>
          </select>
          <input
            type="text"
            placeholder="category"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            className="border border-gray-300 p-2 rounded text-black w-full sm:w-1/3"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-green-500 font-semibold text-white p-2 rounded mt-2 w-full"
        >
          {ingredientToEdit ? "update ingredient" : "add ingredient"}
        </button>
        <button
          onClick={onClose}
          className="bg-red-400 font-semibold text-white p-2 rounded mt-2 w-full"
        >
          close
        </button>
      </div>
    </div>
  );
};

export default IngredientPopup;

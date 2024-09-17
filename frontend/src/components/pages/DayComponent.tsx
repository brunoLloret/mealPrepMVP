import React, { useState } from "react";
import AlertPopup from "../base/AlertPopup";
import "./DayComponent.css";

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

interface DayComponentProps {
  day: Day;
  date: Date;
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
  onClose: () => void;
  onAddToCart: () => void;
}

const DayComponent: React.FC<DayComponentProps> = ({
  day,
  date,
  cart,
  setCart,
  onClose,
  onAddToCart,
}) => {
  return (
    <div className="relative bg-sky-400 text-md max-w-screen-lg mx-auto p-4 rounded-lg shadow-lg">
      <div className="relative">
        <h2 className="text-2xl font-bold mb-4">{date.toDateString()}</h2>
        {day.Meals.map((meal) => (
          <MealComponent
            key={meal.mealId}
            meal={meal}
            cart={cart}
            setCart={setCart}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

interface MealComponentProps {
  meal: Meal;
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
  onAddToCart: () => void;
}

const MealComponent: React.FC<MealComponentProps> = ({
  meal,
  cart,
  setCart,
  onAddToCart,
}) => {
  return (
    <div className="bg-amber-300 p-4 mb-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">{meal.mealName}</h2>
      {meal.recipes.map((recipe, index) => (
        <RecipeComponent
          key={index}
          recipe={recipe}
          cart={cart}
          setCart={setCart}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

interface RecipeComponentProps {
  recipe: Recipe;
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
  onAddToCart: () => void;
}

const RecipeComponent: React.FC<RecipeComponentProps> = ({
  recipe,
  cart,
  setCart,
  onAddToCart,
}) => {
  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
      <RecipeHeader recipe={recipe} />
      <RecipeIngredients
        recipe={recipe}
        cart={cart}
        setCart={setCart}
        onAddToCart={onAddToCart}
      />
      <RecipeInstructions recipe={recipe} />
    </div>
  );
};

const RecipeHeader: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <div className="bg-lime-200 p-2 mb-2 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold">{recipe.name}</h3>
      {recipe.URL && (
        <a href={recipe.URL} className="text-blue-500 underline">
          View Recipe
        </a>
      )}
    </div>
  );
};

interface RecipeIngredientsProps {
  recipe: Recipe;
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
  onAddToCart: () => void;
}

const RecipeIngredients: React.FC<RecipeIngredientsProps> = ({
  recipe,
  cart,
  setCart,
  onAddToCart,
}) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="bg-green-500 p-4 rounded-lg mb-4">
      <h4 className="text-lg font-semibold mb-2">Ingredients</h4>
      <ul className="list-disc pl-5">
        {recipe.RecipeIngredients.map((recipeIngredient, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span>
              {recipeIngredient.name} {recipeIngredient.amount}{" "}
              {recipeIngredient.unit}
            </span>
            <button
              onClick={() => {
                setCart((prevCart) => ({
                  recipeIngredients: [
                    ...prevCart.recipeIngredients,
                    recipeIngredient,
                  ],
                }));
                setShowAlert(true);
                onAddToCart();
              }}
              className="bg-cyan-100 text-black px-2 py-1 rounded-full"
              title="Add to cart"
            >
              +
            </button>
          </li>
        ))}
      </ul>

      {showAlert && (
        <AlertPopup
          message="Items added to cart!"
          onClose={handleCloseAlert}
          onGoToCart={() => {}}
        />
      )}
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
    </div>
  );
};

export default DayComponent;

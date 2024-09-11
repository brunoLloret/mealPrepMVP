import React, { useState, useEffect } from "react";
import Recipes from "./Recipes";
import MealCalendar from "./MealCalendar";
import Shopping from "./Shopping";
import frontImage from "../../assets/frontImage.png";
import { Cart, ShoppingLists } from "../types/mealTypes";
import { listOfShoppingLists } from "../../../../shared/sample";

type Cart = {
  recipeIngredients: RecipeIngredient[];
};

const Front: React.FC = () => {
  const [view, setView] = useState<null | string>(null);
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);
  const [shoppingLists, setShoppingLists] = useState<ShoppingLists>({});
  const [cart, setCart] = useState<Cart>({ recipeIngredients: [] });

  const handleViewChange = (newView: string) => {
    setView((prevView) => (prevView === newView ? null : newView));
  };

  React.useEffect(() => {
    setShoppingLists(listOfShoppingLists);
  }, []);

  useEffect(() => {
    console.log("Updated list of shopping lists:", shoppingLists);
  }, [shoppingLists]);

  useEffect(() => {
    console.log("FRONT Cart has been updated", cart);
  }, [cart]);

  const handleAddToCart = (ingredient: RecipeIngredient) => {
    setCart((prevCart) => ({
      recipeIngredients: [
        ...prevCart.recipeIngredients,
        {
          ...ingredient,
          ingredient: {
            ...ingredient.ingredient,
            category: ingredient.ingredient.category || "Uncategorized",
          },
        },
      ],
    }));
  };

  return (
    <div className="min-h-screen bg-sky-400 flex flex-col overflow-y-auto">
      {/* Fixed Navbar */}
      <div className="sticky top-0 w-full bg-sky-600 text-white p-4 flex justify-center space-x-4 z-10">
        <button
          className="bg-green-500 border-8 border-b-green-900 border-l-green-950 font-mono font-semibold text-lg px-4 py-2"
          onClick={() => handleViewChange("recipes")}
        >
          Recipes
        </button>
        <button
          className="bg-green-500 border-8 border-b-green-900 border-l-green-950 font-mono font-semibold text-lg px-4 py-2"
          onClick={() => handleViewChange("calendar")}
        >
          Calendar
        </button>
        <button
          className="bg-green-500 border-8 border-b-green-900 border-l-green-950 font-mono font-semibold text-lg px-4 py-2"
          onClick={() => handleViewChange("shopping")}
        >
          Shopping
        </button>
      </div>

      <div className="flex-grow flex flex-col items-center w-full max-w-6xl mx-auto px-4">
        {view === null && (
          <div className="text-white flex flex-col items-center w-full mt-16">
            <div className="flex-grow flex items-center justify-center w-full">
              <div className="text-6xl text-center border-8 rounded-full border-fuchsia-300">
                <img
                  src={frontImage}
                  alt="A group of kawaii elements of traditional Japanese everyday food"
                  className="w-60 h-60 rounded-full border-8 border-fuchsia-300 object-cover"
                />
              </div>
            </div>
            <div className="items-center justify-center mb-8 w-full p-10">
              <h2 className="font-supermercado text-8xl mx-auto text-center">
                Meal Prep
              </h2>
            </div>
          </div>
        )}

        {view === "recipes" && <Recipes onAddToCart={handleAddToCart} />}
        {view === "calendar" && (
          <MealCalendar
            cart={cart}
            setCart={setCart}
            onAddToCart={handleAddToCart}
          />
        )}
        {view === "shopping" && (
          <Shopping lists={shoppingLists} cart={cart} setCart={setCart} />
        )}
      </div>
    </div>
  );
};

export default Front;

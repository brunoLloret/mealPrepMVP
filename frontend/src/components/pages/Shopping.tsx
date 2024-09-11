import React, { useState, useCallback } from "react";
import seeAllList from "../../assets/seeAllList.png";
import createNewList from "../../assets/createNewList.png";
import shoppingIcon from "../../assets/shoppingIcon.png";
import Lists from "../compound/Shopping/Lists";
import FinalListCreator from "../compound/Shopping/FinalListCreator";
import ShoppingOrderPopup from "../compound/Shopping/ShoppingOrderPopup";
import PlaceOrderPopup from "../../components/base/PlaceOrderPopup";
import { Cart, ShoppingLists } from "../types/mealTypes";

import { ShoppingCartIcon } from "lucide-react";

type Ingredient = {
  ingredient: {
    name: string;
    category: string;
  };
  notes: string;
  amount: number;
  unit: string;
};

export type Cart = {
  recipeIngredients: Omit<Ingredient, "notes">[];
};

type ShoppingLists = {
  [key: string]: Ingredient[];
};

type ShoppingProps = {
  lists: ShoppingLists;
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
};

const Shopping: React.FC<ShoppingProps> = ({ lists, cart, setCart }) => {
  const [view, setView] = useState("lists");
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [showPlaceOrderPopup, setShowPlaceOrderPopup] = useState(false);

  const getIconSrc = () => {
    switch (view) {
      case "lists":
        return seeAllList;
      case "create unified list":
        return createNewList;
      default:
        return shoppingIcon;
    }
  };

  const handleOnView = (view: string) => {
    setView(view);
  };

  const handleShowOrderPopup = useCallback(() => {
    setShowOrderPopup(true);
  }, []);

  const handlePlaceOrder = useCallback(() => {
    setShowPlaceOrderPopup(true);
    setShowOrderPopup(false);
  }, []);

  return (
    <div className="fixed bg-sky-400 flex flex-col min-h-screen w-full max-w-screen-lg mx-auto">
      <div className="flex flex-col items-center justify-center h-full relative">
        {/* Button Container */}
        <div className="flex flex-col items-center space-y-4">
          {/* Top row of buttons */}
          <div className="flex space-x-4 mb-8">
            <div className="w-72" />
          </div>

          {/* Middle row of buttons */}
          <div className="flex pt-0 space-x-4 mb-4">
            <button
              className="py-4 font-mono font-semibold text-md bg-blue-500 text-xl text-white rounded-full border-8 w-28 border-b-blue-800 border-l-blue-950"
              onClick={() => handleOnView("lists")}
            >
              all lists
            </button>

            {/* Centered Icon */}
            <div className="flex items-center justify-center mb-4 rounded-full border-8 border-fuchsia-300">
              <img
                src={getIconSrc()}
                alt="Current View Icon"
                className="w-28 h-28 p-2 rounded-full border-1 border-fuchsia-300 object-cover"
              />
            </div>

            <button
              className="py-4 font-mono font-semibold  bg-fuchsia-400 text-white text-xl rounded-full border-8 w-28 border-b-fuchsia-700 border-l-fuchsia-950"
              onClick={() => handleOnView("create unified list")}
            >
              new list
            </button>
          </div>

          {/* Bottom row of buttons */}
          <div className="flex space-x-4">
            <button
              className="flex flex-col justify-center items-center py-4 font-mono font-semibold text-md bg-red-500 text-white rounded-full border-8 border-b-red-800 border-l-red-950"
              onClick={handleShowOrderPopup}
            >
              <ShoppingCartIcon />
            </button>
          </div>
        </div>

        {/* Render component based on view state */}
        <div className="flex flex-col items-center mt-8">
          {view === "lists" && (
            <Lists
              lists={lists}
              cart={cart}
              setCart={setCart}
              onGoToCart={handleShowOrderPopup}
            />
          )}
          {view === "create unified list" && (
            <FinalListCreator
              setCart={setCart}
              cart={cart}
              onGoToCart={handleShowOrderPopup}
            />
          )}
        </div>

        {/* Render the ShoppingOrderPopup when showOrderPopup is true */}
        {showOrderPopup && (
          <ShoppingOrderPopup
            onClose={() => setShowOrderPopup(false)}
            cart={cart}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {/* Render the PlaceOrderPopup when showPlaceOrderPopup is true */}
        {showPlaceOrderPopup && (
          <PlaceOrderPopup onClose={() => setShowPlaceOrderPopup(false)} />
        )}
      </div>
    </div>
  );
};

export default Shopping;

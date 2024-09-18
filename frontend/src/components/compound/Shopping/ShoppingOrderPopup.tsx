import React, { useMemo } from "react";
import { XIcon } from "lucide-react";
import { Cart, RecipeIngredient, Category } from "../types/mealTypes";

interface ShoppingOrderPopupProps {
  onClose: () => void;
  cart: Cart;
  onPlaceOrder: () => void;
}

const ShoppingOrderPopup: React.FC<ShoppingOrderPopupProps> = ({
  onClose,
  cart,
  onPlaceOrder,
}) => {
  const handlePlaceOrder = () => {
    onPlaceOrder();
    onClose();
  };

  const handleContinuePlanning = () => {
    onClose();
  };

  const organizedIngredients = useMemo(() => {
    console.log("Cart contents:", cart); // Debugging line

    const categorized: Record<Category, RecipeIngredient[]> = {} as Record<
      Category,
      RecipeIngredient[]
    >;

    if (!cart.recipeIngredients || !Array.isArray(cart.recipeIngredients)) {
      console.error(
        "cart.recipeIngredients is not an array:",
        cart.recipeIngredients
      );
      return categorized;
    }

    cart.recipeIngredients.forEach((item, index) => {
      if (!item) {
        console.error(`Undefined item at index ${index}`);
        return; // Skip this iteration
      }

      console.log(`Processing item at index ${index}:`, item); // Debugging line

      // Use a default category if the ingredient or category is undefined
      const category = (item.ingredient?.category as Category) || "Other";
      if (!categorized[category]) {
        categorized[category] = [];
      }

      const existingItem = categorized[category].find(
        (i) =>
          i.ingredient?.name === item.ingredient?.name && i.unit === item.unit
      );

      if (existingItem) {
        existingItem.amount += item.amount;
      } else {
        categorized[category].push({ ...item });
      }
    });

    console.log("Organized ingredients:", categorized); // Debugging line
    return categorized;
  }, [cart.recipeIngredients]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-mono">
      <div className="bg-green-100 rounded-lg shadow-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Your Shopping Order</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-700 hover:bg-red-600 bg-red-400 p-1 rounded-full"
          >
            <XIcon size={20} />
          </button>
        </div>
        <div className="mb-4">
          {Object.entries(organizedIngredients).map(([category, items]) => (
            <div key={category} className="mb-4">
              <h4 className="font-bold text-lg mb-2">{category}</h4>
              <ul className="list-disc pl-5">
                {items.map((item, index) => (
                  <li key={index} className="mb-2">
                    <span className="font-medium">
                      {item.ingredient?.name || "Unknown Ingredient"}
                    </span>{" "}
                    - {item.amount} {item.unit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={handleContinuePlanning}
            className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Continue Planning
          </button>
          <button
            onClick={handlePlaceOrder}
            className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingOrderPopup;

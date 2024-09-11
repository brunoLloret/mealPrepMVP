import React, { useMemo } from "react";
import { XIcon } from "lucide-react";

type Ingredient = {
  ingredient: {
    name: string;
    category: string;
  };
  amount: number;
  unit: string;
};

type Cart = {
  recipeIngredients: Ingredient[];
};

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

  const organizedIngredients = useMemo(() => {
    const categorized: Record<string, Ingredient[]> = {};
    cart.recipeIngredients.forEach((item) => {
      const category = item.ingredient.category || "Uncategorized";
      if (!categorized[category]) {
        categorized[category] = [];
      }
      const existingItem = categorized[category].find(
        (i) =>
          i.ingredient.name === item.ingredient.name && i.unit === item.unit
      );
      if (existingItem) {
        existingItem.amount += item.amount;
      } else {
        categorized[category].push({ ...item });
      }
    });
    return categorized;
  }, [cart.recipeIngredients]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-mono">
      <div className="bg-green-100 rounded-lg shadow-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Your Shopping Order</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-700 hover:bg-red-600 bg-red-400"
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
                    <span className="font-medium">{item.ingredient.name}</span>{" "}
                    - {item.amount} {item.unit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-6">
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

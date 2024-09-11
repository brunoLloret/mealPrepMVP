import React, { useState, useEffect, useCallback } from "react";
import { ShoppingBasketIcon } from "lucide-react";
import AlertPopup from "@/components/base/AlertPopup";

type Ingredient = {
  ingredient: {
    name: string;
    category: string;
  };
  notes: string;
  amount: number;
  unit: string;
};

type ShoppingLists = {
  [key: string]: Ingredient[];
};

type Cart = {
  recipeIngredients: Omit<Ingredient, "notes">[];
};

type ListsProps = {
  lists: ShoppingLists;
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
  onGoToCart: () => void;
};

const Lists: React.FC<ListsProps> = ({ lists, cart, setCart, onGoToCart }) => {
  const [showListPopup, setShowListPopup] = useState<boolean>(false);
  const [displayList, setDisplayList] = useState<Ingredient[]>([]);
  const [popupColorClass, setPopupColorClass] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<Ingredient | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const colorPalette = [
    "bg-lime-300",
    "bg-rose-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-300",
    "bg-purple-300",
    "bg-teal-300",
  ];

  const handleList = useCallback((list: Ingredient[], colorClass: string) => {
    setShowListPopup(true);
    setDisplayList(list);
    setPopupColorClass(colorClass);
  }, []);

  const closePopup = useCallback(() => {
    setShowListPopup(false);
    setDisplayList([]);
    setPopupColorClass("");
    setEditingIndex(null);
    setEditedItem(null);
  }, []);

  const handleEdit = useCallback(
    (index: number) => {
      setEditingIndex(index);
      setEditedItem({ ...displayList[index] });
    },
    [displayList]
  );

  const handleSave = useCallback(
    (index: number) => {
      if (editedItem) {
        setDisplayList((prevList) => {
          const updatedList = [...prevList];
          updatedList[index] = editedItem;
          return updatedList;
        });
        setEditingIndex(null);
        setEditedItem(null);
      }
    },
    [editedItem]
  );

  const addToCart = useCallback(
    (list: Ingredient[]) => {
      const itemsWithoutNotes = list.map(({ notes, ...item }) => item);
      setCart((prevCart) => ({
        recipeIngredients: [
          ...prevCart.recipeIngredients,
          ...itemsWithoutNotes,
        ],
      }));
      setShowAlert(true);
    },
    [setCart]
  );

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  useEffect(() => {
    console.log("Cart has been updated:", cart);
  }, [cart]);

  return (
    <div>
      {Object.entries(lists).map(([key, list], index) => {
        const colorClass = colorPalette[index % colorPalette.length];
        return (
          <div key={key} className="mb-4">
            <h2 className="flex items-center">
              <button
                onClick={() => handleList(list, colorClass)}
                className={`${colorClass} font-bold text-left p-3 w-52 rounded-md`}
              >
                {key}
              </button>
              <button
                onClick={() => addToCart(list)}
                className="ml-4 font-mono font-bold bg-red-500 text-white px-4 py-2 rounded hover:bg-red-900"
              >
                <ShoppingBasketIcon />
              </button>
            </h2>
          </div>
        );
      })}

      {showListPopup && (
        <div className="fixed font-mono inset-0 bg-purple-900 bg-opacity-50 flex items-center justify-center">
          <div
            className={`p-4 rounded-lg max-w-2xl w-96 max-h-[90vh] overflow-y-auto ${popupColorClass}`}
          >
            {displayList.map((item, index) => (
              <div key={index} className="flex items-center mb-2">
                <div className="flex-1">
                  <span>{item.ingredient.name}</span>
                  {editingIndex === index ? (
                    <div>
                      <input
                        type="text"
                        value={editedItem?.ingredient.name || ""}
                        onChange={(e) =>
                          setEditedItem((prev) => ({
                            ...prev!,
                            ingredient: {
                              ...prev!.ingredient,
                              name: e.target.value,
                            },
                          }))
                        }
                        className="border p-1 ml-2"
                      />
                      {/* Add other input fields here */}
                    </div>
                  ) : (
                    <div>
                      <span>
                        {item.ingredient.category} - {item.amount} {item.unit}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleEdit(index)}
                  className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                {editingIndex === index && (
                  <button
                    onClick={() => handleSave(index)}
                    className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Save
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={closePopup}
              className="mt-4 bg-red-500 text-white font-bold px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showAlert && (
        <AlertPopup
          message="Items added to cart!"
          onClose={() => setShowAlert(false)}
          onGoToCart={onGoToCart}
        />
      )}
    </div>
  );
};

export default Lists;

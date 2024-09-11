import { useState, useEffect } from "react";

const ShoppingCartPopup = ({
  addedItems,
  onClose,
  onGoToCart,
  onKeepPlanning,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5000); // Auto-close after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm w-full">
      <h3 className="text-lg font-semibold mb-2">Added to Cart</h3>
      <ul className="mb-4">
        {addedItems.map((item, index) => (
          <li key={index} className="text-sm text-gray-600">
            {item}
          </li>
        ))}
      </ul>
      <div className="flex justify-between">
        <button
          onClick={onGoToCart}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Go to Shopping Cart
        </button>
        <button
          onClick={onKeepPlanning}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Keep Planning Meals
        </button>
      </div>
    </div>
  );
};

export default ShoppingCartPopup;

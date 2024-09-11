import React, { useState, useEffect } from "react";
import { ShoppingCartIcon, ArrowLeftIcon } from "lucide-react";

interface AlertPopupProps {
  message: string;
  onClose: () => void;
  onGoToCart: () => void;
}

const AlertPopup: React.FC<AlertPopupProps> = ({
  message,
  onClose,
  onGoToCart,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 5000); // Hide after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const handleGoToCart = () => {
    onGoToCart();
    setIsVisible(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{message}</h3>
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center"
          >
            <ArrowLeftIcon size={16} className="mr-2" />
            back to ingredients
          </button>
          <button
            onClick={handleGoToCart}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <ShoppingCartIcon size={16} className="mr-2" />
            go to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertPopup;

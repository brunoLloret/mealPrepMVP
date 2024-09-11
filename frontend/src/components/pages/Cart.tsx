import React from "react";

// Assuming Cart type is imported from a separate file
import { Cart as CartType } from "./types"; // Adjust the import path as needed

interface CartProps {
  cart: CartType;
  setCart: React.Dispatch<React.SetStateAction<CartType>>;
}

const CartComponent: React.FC<CartProps> = ({ cart, setCart }) => {
  return <div>Cart</div>;
};

export default CartComponent;

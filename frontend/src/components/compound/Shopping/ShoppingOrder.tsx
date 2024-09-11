// import React, { useState } from "react";
// import ShoppingOrderPopup from "./ShoppingOrderPopup";

// type Ingredient = {
//   ingredient: {
//     name: string;
//     category: string;
//   };
//   notes: string;
//   amount: number;
//   unit: string;
// };

// type Cart = {
//   recipeIngredients: Ingredient[];
// };

// type ShoppingOrderProps = {
//   cart: Cart;
//   onPlaceOrder: () => void;
// };

// const ShoppingOrder: React.FC<ShoppingOrderProps> = ({
//   cart,
//   onPlaceOrder,
// }) => {
//   const [showPopup, setShowPopup] = useState(false);

//   const handlePlaceOrder = () => {
//     setShowPopup(true);
//     onPlaceOrder();
//   };

//   return (
//     <div className="font-mono">
//       <h2 className="text-2xl font-bold mb-4">Your Order</h2>
//       <div>
//         <ul>
//           {cart.recipeIngredients.length > 0 ? (
//             cart.recipeIngredients.map((item, index) => (
//               <li key={index} className="mb-2">
//                 <h3>{item.ingredient.name}</h3>
//                 <h3>{item.ingredient.category}</h3>
//                 <h3>
//                   {item.amount} {item.unit}
//                 </h3>
//               </li>
//             ))
//           ) : (
//             <li>No ingredients found...</li>
//           )}
//         </ul>
//       </div>
//       <button
//         onClick={handlePlaceOrder}
//         className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
//       >
//         Place Order
//       </button>
//       {showPopup && (
//         <ShoppingOrderPopup onClose={() => setShowPopup(false)} cart={cart} />
//       )}
//     </div>
//   );
// };

// export default ShoppingOrder;

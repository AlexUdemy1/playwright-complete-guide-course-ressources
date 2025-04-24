import { CartContext } from "@/src/context/CartContext";
import { useContext } from "react";

const CartIcon = () => {
  const cartCtx = useContext(CartContext);
  
  const totalQuantity = cartCtx.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {totalQuantity > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-1 py-0.5 mt-6 mr-6 rounded-full">
         *
        </span>
      )}
    </>
  );
};

export default CartIcon;

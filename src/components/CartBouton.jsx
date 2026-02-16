import React from "react";
import { useCart } from "../context/cartContext";

const CartBouton = ({ item, fromCart }) => {
  const { addToCart, removeFromCart, updateQuantity } = useCart();
  return (
    <div className={`max-w absolute top-5 right-5 ${fromCart && "scale-90"}`}>
      <div className="space-x-3">
        {!item.inCart ? (
          <button
            type="button"
            className="lg:text-sm text-xs bg-zinc-400 cursor-pointer hover:bg-zinc-500 transition-colors text-white border rounded-md px-2 py-1"
            onClick={() => addToCart(item)}
          >
            + Add to cart
          </button>
        ) : (
          <div>
            <div className="flex">
              <button className="border rounded-lg px-3"
              onClick={()=>{
                if(item.quantity === 1 ) {
                  removeFromCart(item)
                }
                else {
                  updateQuantity(item, -1)
                }
              }}
              >-</button>
              <p className="flex items-center gap-x-1 mx-1 ">
                <span className="bg-green-100 rounded-full min-w-7 grid place-items-center">
                  {item.quantity}
                </span>
                <span className="text-xs">in cart</span>
              </p>
              <button className="border rounded-lg px-3" onClick={()=> {
                updateQuantity(item, 1)
              }} >+</button>
            </div>
            <button
              className="bg-pink-300 text-white text-xs px-2 py-1 mt-2 mx-auto block border rounded-md cursor-pointer"
              onClick={() => removeFromCart(item)}
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartBouton;

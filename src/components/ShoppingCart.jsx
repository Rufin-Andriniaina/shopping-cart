import { ShoppingCartIcon, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";
import CartItem from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";

const ShoppingCart = () => {
  const { allItems, setItemsStorage } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const inCartItems = allItems.filter((item) => item.inCart);
    setCartItems(inCartItems); 

    const price = inCartItems.reduce((accumulator, item) => {
      return (accumulator += item.price * item.quantity);
    }, 0);

    setTotalPrice(price);


    setItemsStorage()

  }, [allItems]);

  return (
    <>
      {cartItems.length !== 0 && (
        <div
          className={`w-75 h-screen fixed top-0 border-l-4 border-red-200 bg-gray-200 rounded-tl-lg z-30 ${isOpen ? "right-0" : "-right-75"}`}
        >
          <div className="w-full h-16 border border-white grid place-items-center rounded-lg top-0 left-0 bg-white">
            <h1 className="text-gray-500 text-xl">Shopping Cart</h1>
            <button
              className="w-9 h-9 cursor-pointer absolute right-3 z-20 bg-yellow-400 grid place-items-center hover:bg-yellow-500 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <XIcon className="text-white" />
            </button>
          </div>
          <button
            className="z-20 cursor-pointer w-9 h-9 bg-yellow-400 hover:bg-yellow-500 absolute -left-14 top-3 rounded-full "
            onClick={() => setIsOpen(true)}
          >
            <ShoppingCartIcon className="text-white  text-sm" />
            <span className="w-6 h-6 absolute -left-2 -bottom-4 text-xs font-bold text-white border rounded-full grid place-items-center bg-gray-300">
              {cartItems.length > 9 ? "9+" : cartItems.length}
            </span>
          </button>

          <div className="h-screen overflow-y-scroll flex flex-col gap-y-3 pb-24 pt-20">
            {cartItems?.map((item) => {
              return <CartItem key={item.id} item={item} fromCart={true} />;
            })}
          </div>

          <div className="w-full h-20 absolute bottom-0 left-0  z-10 rounded-lg bg-white grid place-items-center ">
            <h1 className="text-xl text-gray-600">
              Total : {formatCurrency(totalPrice)}
            </h1>
            <button className="bg-blue-300 hover:bg-blue-400  transition-colors px-2 rounded-lg text-white">
              buy now
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;

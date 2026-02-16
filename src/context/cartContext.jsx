import { createContext, useContext, useState } from "react";
import { allProducts } from "../assets/data";
import {
  getItemStorage,
  getItemStorageParse,
  setItemStorage,
} from "../utilities/localStorageFns";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // ALL PRODUCTS
  const [allItems, setAllItems] = useState([]);
  const setItems = () => {
    setAllItems(allProducts);
  };

  // ADD PRODUCT => UPDATE inCart : True
  const addToCart = (item) => {
    setAllItems((prevItems) => {
      return prevItems.map((prevItem) => {
        if (prevItem.inCart) {
          return prevItem;
        }

        return item.id === prevItem.id
          ? { ...prevItem, inCart: true }
          : prevItem;
      });
    });
  };

  // REMOVE PRODUCT => RESET inCart : false, quantity : 1
  const removeFromCart = (item) => {
    setAllItems((prevItems) => {
      return prevItems.map((prevItem) => {
        return prevItem.id === item.id
          ? { ...prevItem, inCart: false, quantity: 1 }
          : prevItem;
      });
    });
  };

  // UPDATE QUANTITY : MINUS AND PLUS
  const updateQuantity = (cartItem, amount) => {
    setAllItems((prevItems) => {
      return prevItems.map((item) => {
        return cartItem.id === item.id
          ? { ...item, quantity: item.quantity + amount }
          : item;
      });
    });
  };

  // LOCALSTORAGE ITEM
  const setItemsStorage = () => {
    if (allItems.length !== 0) {
      const inCartItems = allItems.filter((item) => item.inCart);
      setItemStorage("cartItems", inCartItems);
    }
  };

  // LOCALSTORAGE CART ITEM
const setCartItemStorage = () => {
  if(getItemStorage("cartItems") !== null) {
    const storageItems = getItemStorageParse("cartItems")

    setAllItems((prevItems)=>{
      return prevItems.map((prevItem) => {
        const mathItems = storageItems.find((storageItem)=> storageItem.id === prevItem.id)
        return mathItems ? mathItems : prevItem
      })
      
    })
  }
}

  return (
    <CartContext.Provider
      value={{
        allItems,
        setItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        setItemsStorage,
        setCartItemStorage
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  return useContext(CartContext);
};

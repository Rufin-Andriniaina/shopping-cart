import { useEffect } from "react";
import CartItem from "./components/CartItem";
import { useCart } from "./context/cartContext";
import ShoppingCart from "./components/ShoppingCart";
import { getItemStorage, getItemStorageParse } from "./utilities/localStorageFns";

const App = () => {
  const { allItems, setItems, setCartItemStorage } = useCart();

  useEffect(() => {
    setItems();

    if((getItemStorage("cartItems")) !== null && getItemStorageParse("cartItems")?.length !== 0 ) {
      setCartItemStorage()
    }
  }, []);

  useEffect(() => {
    console.log(allItems);
  }, [allItems]);

  
  return (
    <div className="mx-8 grid place-items-center py-20">
      <h1 className="lg:text-5xl md:text-4xl text-2xl text-center italic mb-16 text-gray-500">
        Alert! le produit est pour vous maintenant!
      </h1>
      <ShoppingCart />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-start gap-10 xl:px-6 px-10">
        {allItems.map((item) => {
          return (
            <div key={item.id}>
              <CartItem item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;

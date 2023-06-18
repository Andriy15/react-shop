import React, { createContext, useState } from "react"
import { readItemFromStorage, setItemToStorage } from "../../feature/utils/handleStorage";

interface ITotalPriceContext {
  totalPrice: number;
  addPrice: (price: number) => void;
  removePrice: (price: number) => void;
}

export const TotalPriceContext = createContext<ITotalPriceContext>({
  totalPrice: 0,
  addPrice: () => {},
  removePrice: () => {},
});


// Fix total price adding with quantity 
export const TotalPriceState = ({ children }: { children: React.ReactNode }) => {
  const [totalPrice, setTotalPrice] = useState(readItemFromStorage('totalPrice') || 0)

  const addPrice = (price: number) => {
    setTotalPrice(price)
    setItemToStorage('totalPrice', totalPrice)
  }

  const removePrice = (price: number) => {
    setTotalPrice(price)
    setItemToStorage('totalPrice', totalPrice)
  }

  return (
     <TotalPriceContext.Provider value={{ totalPrice, addPrice, removePrice }}>
       {children}
     </TotalPriceContext.Provider>
  );
};

import React, { createContext, useState } from "react"

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

export const TotalPriceState = ({ children }: { children: React.ReactNode }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  const addPrice = (price: number) => {
    setTotalPrice((prevTotalPrice) => prevTotalPrice + price)
  };

  const removePrice = (price: number) => {
    setTotalPrice((prevTotalPrice) => prevTotalPrice - price)
  }

  return (
     <TotalPriceContext.Provider value={{ totalPrice, addPrice, removePrice }}>
       {children}
     </TotalPriceContext.Provider>
  );
};

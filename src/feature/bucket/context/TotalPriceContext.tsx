import React, { createContext, useContext, useState } from "react"
import { readItemFromStorage, setItemToStorage } from "../../utils/handleStorage";

interface ITotalPriceContext {
  totalPrice: number;
  addPrice: (price: number) => void;
  removePrice: (price: number) => void;
}

export const TotalPriceContext = createContext<ITotalPriceContext>({
  totalPrice: 0,
  addPrice: () => {},
  removePrice: () => {},
})


export const TotalPriceState = ({ children }: { children: React.ReactNode }) => {
  const [totalPrice, setTotalPrice] = useState(readItemFromStorage('totalPrice') || 0)


  const addPrice = (price: number) => {
    const newPrice = totalPrice + price
    setTotalPrice(newPrice)
    setItemToStorage('totalPrice', newPrice)
  }

  const removePrice = (price: number) => {
    const newPrice = totalPrice - price
    setTotalPrice(newPrice)
    setItemToStorage('totalPrice', newPrice)
  }

  return (
     <TotalPriceContext.Provider value={{ totalPrice, addPrice, removePrice }}>
       {children}
     </TotalPriceContext.Provider>
  )
}

export const useTotalPrice = () => {
  return useContext(TotalPriceContext)
}

import React, { createContext, useState } from "react"

interface ICurrencyContext {
  currency: string
  onToggleUah: () => void
  onToggleUsd: () => void
}

export const CurrencyContext = createContext<ICurrencyContext>({
  currency: '',
  onToggleUah: () => {},
  onToggleUsd: () => {},
})

export const CurrencyState = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrency] = useState("usd")

  const onToggleUah = () => setCurrency('uah');
  const onToggleUsd = () => setCurrency('usd');

  return (
     <CurrencyContext.Provider value={{ currency, onToggleUah, onToggleUsd }}>
       {children}
     </CurrencyContext.Provider>
  )
}

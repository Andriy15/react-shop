import React, { createContext, useState } from "react"
import {useAppSelector} from "../../store/hooks/redux";

interface ICountContext {
  count: number
  addCount: () => void
  removeCount: () => void
}

export const CountContext = createContext<ICountContext>({
  count: 0,
  addCount: () => {},
  removeCount: () => {},
})

export const CountState = ({ children }: { children: React.ReactNode }) => {
  const data = useAppSelector((state) => state.bucket.data)

  const [count, setCount] = useState(data.length)

  const addCount = () => setCount(count + 1);
  const removeCount = () => setCount(count - 1);

  return (
     <CountContext.Provider value={{ count, addCount, removeCount }}>
       {children}
     </CountContext.Provider>
  )
}

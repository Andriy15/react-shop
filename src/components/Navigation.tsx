import { Link } from "react-router-dom";
import {useContext} from "react";
import {CurrencyContext} from "../context/CurrencyContext";


export function Navigation() {
  const { onToggleUsd, onToggleUah } = useContext(CurrencyContext)

  return (
     <nav className="h-[50px] flex w-full justify-around items-center px-5 bg-gray-300 text-black">
       <span>React Project</span>

       <span>
          <Link className="mr-20 font-bold" to="/">
            Products
          </Link>
          <Link className="font-bold mr-20" to="/about">
            About
          </Link>
        <span className="border border-black py-1 px-2 mb-2">
          <button className="mr-4 cursor-pointer" onClick={onToggleUah}>UAH</button>
          <button className="cursor-pointer" onClick={onToggleUsd}>USD</button>
        </span>
      </span>
     </nav>
  );
}

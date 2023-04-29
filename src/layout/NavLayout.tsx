import {useContext, useState} from "react";
import {CurrencyContext} from "../context/CurrencyContext";
import {IProduct} from "../models";
import {getAuth} from "firebase/auth";
import {app} from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import {Badge} from "@mui/material";
import {CountContext} from "../context/CountItemsInBucketContext";
import { AlertDialogOut } from "../components/AlertDialogOut";
import { NavLink } from "react-router-dom";

interface Props {
    products: IProduct[],
    children: React.ReactNode
}


export function NavLayout( {products, children}: Props ) {

    const { currency, onToggleUsd, onToggleUah } = useContext(CurrencyContext)
    const {count} = useContext(CountContext)
  
  
    const [searchQuery, setSearchQuery] = useState("")
  
    const auth = getAuth(app)
    const [user] = useAuthState(auth)
  
    const filteredProducts = products.filter((product) =>
       product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault()
      setSearchQuery(event.target.value)
    }

    return (
        <>
            <nav className="bg-white shadow-sm py-3">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <NavLink className="text-2xl font-bold text-gray-900" to="/">
                    React Shop
                    </NavLink>
                    <div className="flex items-center">
                    <NavLink
                        className="mx-4 text-gray-600 hover:text-gray-900"
                        to="/"
                    >
                        Products
                    </NavLink>
                    <NavLink
                        className="mx-4 text-gray-600 hover:text-gray-900"
                        to="/bucket"
                    >
                        <Badge badgeContent={count} color="primary">Bucket</Badge>
                    </NavLink>

                    <div className="flex items-center border border-gray-300 rounded-lg p-2">
                        <button
                            className="text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 py-1 px-2 rounded-lg mr-2 focus:outline-none"
                            onClick={onToggleUah}
                        >
                        {currency === "USD" ? "USD" : "UAH"}
                        </button>
                        <button
                            className="text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 py-1 px-2 rounded-lg focus:outline-none"
                            onClick={onToggleUsd}
                        >
                        {currency === "USD" ? "UAH" : "USD"}
                        </button>
                    </div>
                    <div className="ml-4">
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={handleInputChange}
                        />

                        {searchQuery.length >= 2 && (
                            <div className="bg-gray-100 rounded-lg p-4 absolute mt-2 w-64 z-10">
                            {filteredProducts.length > 0 ? (
                                <ul>
                                {filteredProducts.map((product: IProduct) => (
                                    <li key={product.id} className="text-gray-800 py-2 hover:bg-gray-200 cursor-pointer">
                                        <span className='py-4'>
                                        {product.title.split(" ").slice(0, 5).join(" ")}
                                        </span>
                                    </li>
                                ))}
                                </ul>
                            ) : (
                                <p className="text-gray-800">No products found</p>
                            )}
                            </div>
                        )}
                    </div>

                    {user &&  <AlertDialogOut /> }

                    </div>
                </div>
            </nav>
            <main>
                {children}
            </main>
        </>
    );
}
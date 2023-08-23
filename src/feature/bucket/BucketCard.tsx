import {IProduct} from "../product/Product.models";
import {CurrencyContext} from "../nav/context/Currency.context";
import React, {useContext, useEffect, useState} from "react";
import {useActions} from "../store/hooks/use-actions";
import {useTotalPrice} from "./context/TotalPriceContext";
import {CountContext} from "../nav/context/CountItemsInBucket.context";
import invariant from "tiny-invariant";
import {calculateValue} from "../utils/calculateValue";
import { ToastContainer } from "react-toastify";

interface BoughtItemProps {
  product: IProduct,
  currency: string,
}

function BoughtProductsCard({ product }: BoughtItemProps) {
  const {currency} = useContext(CurrencyContext)
  const { removePrice, addPrice } = useTotalPrice()
  const {removeCount} = useContext(CountContext)

  const [quantity, setQuantity] = useState(1)

  const {removeBucket} = useActions()


  const removeFromBucket = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const data = {
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price.toString(),
      category: product.category,
    }
    removeBucket(data)
    removePrice(product.price)
    removeCount()
  }

  //fix total price adding and removing with quantity
  const handleAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    invariant(quantity < 10, 'Quantity must be 10 or less')
    setQuantity(quantity + 1)
    const newPrice = product.price * (quantity + 1)
    addPrice(newPrice)
  }

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    invariant(quantity > 1, 'Quantity must be 1 or more')
    setQuantity(quantity - 1)                                                                         
    const newPrice = product.price * (quantity - 1)
    removePrice(newPrice)
  }

  return (
     <div className="bg-white p-4 rounded-md shadow-md">
       <div className="flex items-center">
         <img className="w-24 h-24 object-cover" src={product.image} alt={product.title} />
         <div className="flex flex-col ml-4">
           <h2 className="text-lg font-medium text-gray-900">{product.title}</h2>
           <p className="text-sm font-medium text-gray-500">Category: {product.category}</p>
           <p className="text-lg font-medium text-gray-900">Price: {calculateValue(currency, product.price)}{currency === 'usd' ? ' $' : ' UAH'}</p>
         </div>
       </div>
       <div className="flex justify-between items-center mt-4">
         <div className="flex items-center justify-center w-full py-2 px-4">
           <button
              className="text-xl font-bold text-gray-700 bg-gray-300 rounded-full h-8 w-8 mr-2 hover:bg-gray-400"
              onClick={handleRemove}
           >
             -
           </button>
           <span className="text-2xl font-bold text-gray-700">{quantity}</span>
           <button
              className="text-xl font-bold text-gray-700 bg-gray-300 rounded-full h-8 w-8 ml-2 hover:bg-gray-400"
              onClick={handleAdd}
           >
             +
           </button>
         </div>

         <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400"
            onClick={removeFromBucket}
         >
           Remove
         </button>
       </div>
       <ToastContainer />
     </div>
  )
}

export default React.memo(BoughtProductsCard)
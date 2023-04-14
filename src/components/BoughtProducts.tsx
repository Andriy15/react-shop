import { IProduct } from "../models";
import {CurrencyContext} from "../context/CurrencyContext";
import React, {useContext, useMemo, useState} from "react";
import {useActions} from "../hooks/use-actions";
import {TotalPriceContext} from "../context/TotalPriceContext";
import {CountContext} from "../context/CountItemsInBucketContext";
import invariant from "tiny-invariant";
import { toast } from "react-toastify";


interface BoughtItemProps {
  product: IProduct,
  currency: string,
  quantityItem: number
}

function BoughtProducts({ product, quantityItem }: BoughtItemProps) {
  const {currency} = useContext(CurrencyContext)
  const { removePrice, addPrice, totalPrice } = useContext(TotalPriceContext)
  const {removeCount} = useContext(CountContext)

  const [quantity, setQuantity] = useState(1)

  const {removeBucket} = useActions()

  const calculateValue = useMemo(() => {
    function calculate(currency: string, price: number, quantity: number) {
      if (currency === "usd") {
        return product.price * quantity
      } else {
        return product.price * quantity * 40
      }
    }
    return calculate
  }, [currency, product.price, quantity])


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

  const handleAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    invariant(quantity < 10, 'Quantity must be less than 10')
    setQuantity(quantity + 1)
    addPrice(product.price * quantity )
  }

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    invariant(quantity > 1, 'Quantity must be more than 1')
    setQuantity(quantity - 1)
    removePrice(totalPrice - product.price * quantity)
  }


  return (
     <div className="bg-white p-4 rounded-md shadow-md">
       <div className="flex items-center">
         <img className="w-24 h-24 object-cover" src={product.image} alt={product.title} />
         <div className="flex flex-col ml-4">
           <h2 className="text-lg font-medium text-gray-900">{product.title}</h2>
           <p className="text-sm font-medium text-gray-500">Category: {product.category}</p>
           <p className="text-lg font-medium text-gray-900">Price: {calculateValue(currency, product.price, quantity)}{currency === 'usd' ? ' $' : ' UAH'}</p>
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
     </div>
  );
}

export default React.memo(BoughtProducts)
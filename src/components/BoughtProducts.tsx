import { IProduct } from "../models";
import {CurrencyContext} from "../context/CurrencyContext";
import {useContext, useMemo, useState} from "react";
import {useActions} from "../hooks/use-actions";
import {TotalPriceContext} from "../context/TotalPriceContext";
import {CountContext} from "../context/CountItemsInBucketContext";


interface BoughtItemProps {
  product: IProduct,
  currency: string,
}

export function BoughtProducts({ product }: BoughtItemProps) {
  const {currency} = useContext(CurrencyContext)
  const { removePrice, addPrice } = useContext(TotalPriceContext)
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
    };
    removeBucket(data)
    removePrice(product.price)
    removeCount()
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
              onClick={() => setQuantity(quantity - 1)}
              disabled={quantity <= 1}
           >
             -
           </button>
           <span className="text-2xl font-bold text-gray-700">{quantity}</span>
           <button
              className="text-xl font-bold text-gray-700 bg-gray-300 rounded-full h-8 w-8 ml-2 hover:bg-gray-400"
              onClick={() => setQuantity(quantity + 1)}
              disabled={quantity >= 10}
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

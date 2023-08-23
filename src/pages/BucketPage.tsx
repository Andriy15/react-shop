import { useAppSelector } from "../feature/store/hooks/redux";
import { Link } from "react-router-dom";
import BoughtProducts from "../feature/bucket/BucketCard";
import {useContext, useState} from "react";
import { CurrencyContext } from "../feature/nav/context/Currency.context";
import { IProduct } from "../feature/product/Product.models";
import { calculateValue } from "../feature/utils/calculateValue";
import { Payment } from "../feature/bucket/Payment";
import { useTotalPrice } from "../feature/bucket/context/TotalPriceContext";

interface ProductProps extends IProduct {
  currency: string;
}

export function BucketPage() {

  const data = useAppSelector((state) => state.bucket.data)

  const { currency } = useContext(CurrencyContext);
  const { totalPrice } = useTotalPrice()
  const totalPriceNumber = parseFloat(totalPrice.toFixed(2))

  if (data.length === 0)
    return (
       <div className="h-screen flex flex-col justify-center items-center">
         <p className="text-gray-400 text-2xl mb-4">
           Your cart is empty
         </p>
         <Link
            to="/"
            className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
         >
           Go to shop
         </Link>
       </div>
    )

  //totalPrice adding incorectly with quantity 
  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="flex flex-col gap-8">
        {data.map((product) => (
            <BoughtProducts
              product={{ ...product } as ProductProps}
              key={product.id}
              currency={currency}
            />
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <p className="text-xl font-bold mr-2">
          Total: {calculateValue(currency, totalPriceNumber)}{currency === 'usd' ? ' $' : ' UAH'}
        </p>
        <Payment />
      </div>
    </div>
  )
}

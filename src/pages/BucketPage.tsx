import { useAppSelector } from "../hooks/redux";
import { Link } from "react-router-dom";
import { BoughtProducts } from "../components/BoughtProducts";
import {useContext} from "react";
import { CurrencyContext } from "../context/CurrencyContext";
import { IProduct } from "../models";
import { TotalPriceContext } from "../context/TotalPriceContext";

interface ProductProps extends IProduct {
  currency: string;
}

export function BucketPage() {
  const data = useAppSelector((state) => state.bucket.data)

  const { currency } = useContext(CurrencyContext);
  const { totalPrice } = useContext(TotalPriceContext)

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
    );

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
           Total: {totalPrice.toFixed(2)} {currency === "usd" ? "$" : "UAH"}
         </p>
           <a
              href='https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=andriychikulay%40gmail%2ecom&lc=US&item_name=Product&amount=1%2e00&currency_code=USD&button_subtype=services&no_note=0&tax_rate=1%2e000&shipping=0%2e01&bn=PP%2dBuyNowBF%3abtn_buynowCC_LG%2egif%3aNonHostedGuest'
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
           >
             Checkout
           </a>
       </div>
     </div>
  );
}

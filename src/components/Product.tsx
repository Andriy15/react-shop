import { IProduct } from "../models";
import {useContext, useState} from "react";
import {CurrencyContext} from "../context/CurrencyContext";

interface ProductProps {
  product: IProduct;
  currency: string;
}

export function Product({ product }: ProductProps) {
  const [details, setDetails] = useState(false)

  const { currency } = useContext(CurrencyContext)

  const btnBgClassName = details ? "bg-yellow-400" : "bg-blue-400"


  const btnClasses = ["py-2 px-4 border", btnBgClassName];

  function calculateValue(currency: string, price: number) {
    if (currency === "uah") {
      return price * 40;
    } else if (currency === "usd") {
      return price;
    }
  }

  return (
     <div className="border py-2 px-4 rounded flex flex-col items-center mb-2">
       <img src={product.image} className="w-1/6" alt={product.title} />
       <p>{product.title}</p>
       <span className="font-bold" >
         <span>
           {calculateValue(currency, product.price)}{currency === 'usd' ? ' $' : ' UAH'}
         </span>
      </span>

       <button
          className={btnClasses.join(" ")}
          onClick={() => setDetails(prev => !prev)}
       >
         {details ? "Hide details" : "Show details"}
       </button>

       {details && (
          <div>
            <p>
              <span className="font-bold">Description:</span>{" "}
              {product.description}
            </p>
            <p>
              <span className="font-bold">Rate:</span>{" "}
              {product?.rating?.rate ? `${product.rating.rate}` : "unknown"}
            </p>
            <p>
              <span className="font-bold">Count:</span>{" "}
              {product?.rating?.count ? `${product.rating.count}` : "unknown"}
            </p>
          </div>
       )}
     </div>
  );
}

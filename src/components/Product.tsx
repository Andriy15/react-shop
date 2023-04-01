import { IProduct } from "../models";
import {useContext, useMemo, useState} from "react";
import {CurrencyContext} from "../context/CurrencyContext";
import {useActions} from "../hooks/use-actions";
import {useAppSelector} from "../hooks/redux";

interface ProductProps {
  product: IProduct
  currency: string
}

export function Product({ product }: ProductProps) {
  const [details, setDetails] = useState(false)

  const {data} = useAppSelector(state => state.bucket)

  const [isBuy, setIsBuy] = useState(data.findIndex(p => p.id === product.id && p.title === product.title) !== -1)

  const { currency } = useContext(CurrencyContext)

  const {addToBucket, removeBucket} = useActions()

  const btnBgClassName = details ? "bg-yellow-400" : "bg-blue-400"


  const btnClasses = ["py-2 px-4 border", btnBgClassName]

  const buttonStyles = {
    padding: "10px 20px",
    borderRadius: "5px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };


  const calculateValue = useMemo(() => {
    function calculate(currency: string, price: number) {
      if (currency === "uah") {
        return price * 40;
      } else {
        return price;
      }
    }
    return calculate;
  }, []);

  const addBucket = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const data = {
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price.toString(),
      category: product.category
    }
    addToBucket(data)
    setIsBuy(true)
  }
  const removeFromBucket = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const data = {
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price.toString(),
      category: product.category,
    };
    removeBucket(data);
    setIsBuy(false);
  };

  return (
     <div className="border py-2 px-4 rounded flex flex-col items-center mb-2">
       <img src={product.image} className="w-1/6" alt={product.title} />
       <p>{product.title}</p>
       <span className="font-bold" >
         <span>
           <span>Price: {calculateValue(currency, product.price)}{currency === 'usd' ? ' $' : ' UAH'}</span>
         </span>
      </span>

       <div className='flex'>
         <button
            className={btnClasses.join(" ")}
            style={{ ...buttonStyles}}
            onClick={() => setDetails(prev => !prev)}
         >
           {details ? "Hide details" : "Show details"}
         </button>

         {!isBuy && <button
            className='ml-2 bg-green-500'
            style={{ ...buttonStyles}}
            onClick={addBucket}
         >
            Buy product
         </button>}

         {isBuy && <button
            className="ml-2 bg-orange-500"
            style={{ ...buttonStyles}}
            onClick={removeFromBucket}
         >
            Remove product
         </button>}
       </div>

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
  )
}

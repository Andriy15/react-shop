import { IProduct } from "../models";
import {useContext, useMemo, useState} from "react";
import {CurrencyContext} from "../context/CurrencyContext";
import {useActions} from "../hooks/use-actions";
import {useAppSelector} from "../hooks/redux";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {TotalPriceContext} from "../context/TotalPriceContext"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProductProps {
  product: IProduct
  currency: string
}

export function Product({ product }: ProductProps) {
  const [details, setDetails] = useState(false)
  const [showPopup, setShowPopup] = useState(false);

  const {data} = useAppSelector(state => state.bucket)

  const [isBuy, setIsBuy] = useState(data.findIndex(p => p.id === product.id && p.title === product.title) !== -1)

  const { currency } = useContext(CurrencyContext)
  const { addPrice } = useContext(TotalPriceContext)

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
    addPrice(product.price)
    toast.success('Product was added to Bucket!!!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
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
    setIsBuy(false)
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
            onClick={() => setShowPopup(true)}
         >
            Buy product
         </button>}

         {showPopup && (
            <Popup
               open={showPopup}
               closeOnDocumentClick
               onClose={() => setShowPopup(false)}
               className="w-3/4 mx-auto"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="md:w-1/2 p-4">
                  <h2 className="text-2xl font-bold">{product.title}</h2>
                  <p className="mt-2 mb-4">
                    {product.description}
                  </p>
                  <div className="flex justify-between">
                    <p className="font-bold">
                      Price: {calculateValue(currency, product.price)}{currency === 'usd' ? ' $' : ' UAH'}
                    </p>
                    {!isBuy && <button
                       className="bg-green-500 text-white px-4 py-2 rounded"
                       onClick={addBucket}
                    >
                      Buy
                    </button>}

                    {isBuy && <button
                       className="ml-2 bg-orange-500"
                       style={{ ...buttonStyles}}
                       onClick={removeFromBucket}
                    >
                      Remove product
                    </button>}
                  </div>
                </div>
              </div>
            </Popup>
         )}


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
       <ToastContainer />
     </div>
  )
}

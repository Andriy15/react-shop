import {IProduct} from "../product/Product.models";
import React, {useContext, useState} from "react";
import {CurrencyContext} from "../nav/context/Currency.context";
import 'reactjs-popup/dist/index.css';
import 'react-toastify/dist/ReactToastify.css';
import {ButtonsProduct} from "../../shared/ButtonsProduct";
import {calculateValue} from "../utils/calculateValue";
import {ButtonDetailsProduct} from "../../shared/ButtonDetailsProduct";
import { Trans } from "@lingui/macro";

interface ProductProps {
  product: IProduct
  currency: string
}

function Product({ product }: ProductProps) {
  const { currency } = useContext(CurrencyContext)

  const [details, setDetails] = useState(false)


  const toggleDetails = (details: boolean): void => {
    setDetails(details)
  }


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

         <ButtonDetailsProduct onDetails={toggleDetails}  hideDetails={<Trans>Hide Details</Trans>} showDetails={<Trans>Show Details</Trans>} />

         <ButtonsProduct product={product} buyButton={<Trans>Buy Product</Trans>} removeButton={<Trans>Remove Product</Trans>} />

       </div>

       {details && (
          <div>
            <p>
              <span className="font-bold">Description:</span>{" "}
              {product.description}
            </p>
            <p>
              <span className="font-bold">Rate:</span> {product?.rating?.rate}
            </p>
            <p>
              <span className="font-bold">Count:</span> {product?.rating?.count}
            </p>
          </div>
       )}

     </div>
  )
}

export default React.memo(Product)

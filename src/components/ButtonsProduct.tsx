import Popup from "reactjs-popup";
import React, {useContext, useState} from "react";
import {IProduct} from "../models";
import {useAppSelector} from "../hooks/redux";
import {toast, ToastContainer} from "react-toastify";
import {TotalPriceContext} from "../context/TotalPriceContext";
import {useActions} from "../hooks/use-actions";
import {CountContext} from "../context/CountItemsInBucketContext";
import {Tooltip} from "@mui/material";

interface ProductProps {
  product: IProduct,
  buyButton: string,
  removeButton: string
}

export function ButtonsProduct({ product, removeButton, buyButton }: ProductProps) {

  const {data} = useAppSelector(state => state.bucket)

  const [isBuy, setIsBuy] = useState(data.findIndex(p => p.id === product.id && p.title === product.title) !== -1)
  
  const { addPrice, removePrice } = useContext(TotalPriceContext)
  const {addCount, removeCount} = useContext(CountContext)

  const {addToBucket, removeBucket} = useActions()

  const [showPopup, setShowPopup] = useState(false)

  const buttonStyles = {
    padding: "10px 20px",
    borderRadius: "5px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  }

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
    addCount()
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
    }
    removeBucket(data)
    setIsBuy(false)
    removePrice(product.price)
    removeCount()
    toast.error('Product was removed from Bucket!!!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  return (
     <>
       {!isBuy &&
          <Tooltip title={`Buy ${product.title}`} arrow >
            <button
             className='ml-2 bg-green-500'
             style={{ ...buttonStyles}}
             onClick={() => setShowPopup(true)}
            >
             {buyButton}
            </button>
          </Tooltip>
       }

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
                   Price: {product.price}
                 </p>
                 {!isBuy && <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={addBucket}
                 >
                   {buyButton}
                 </button>}

                 {isBuy && <button
                    className="ml-2 bg-orange-500"
                    style={{ ...buttonStyles}}
                    onClick={removeFromBucket}
                 >
                   {removeButton}
                 </button>}
               </div>
             </div>
           </div>
         </Popup>
      )}


      {isBuy &&
         <Tooltip title={`Remove ${product.title}`} arrow>
           <button
           className="ml-2 bg-orange-500"
           style={{ ...buttonStyles}}
           onClick={removeFromBucket}
          >
            {removeButton}
          </button>
         </Tooltip>
      }
       <ToastContainer />
     </>
  )
}
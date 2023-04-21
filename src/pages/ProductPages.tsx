import {useProducts} from "../hooks/products-hooks";
import {useContext} from "react";
import {Loader} from "../components/Loader";
import {Error} from "../components/Error";
import Product from "../components/Product";
import {CurrencyContext} from "../context/CurrencyContext";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { motion, useScroll } from "framer-motion"
import React from "react";
import { HoverCardDemo } from "../components/HoverCardDemo";

function ProductPages() {
  const {currency} = useContext(CurrencyContext)

  const { scrollYProgress } = useScroll();

  const {loading, error, products} = useProducts()

  return (
   <>
     <div className='container mx-auto max-w-2xl pt-5'>
       {loading && <Loader />}
       {error && toast.error(<Error error={error} />, {
            position: "top-right",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })}
       {products.map(product => <Product product={product} currency={currency} key={product.id} />)}

       <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-green-500 transform origin-left"
          style={{ scaleX: scrollYProgress }}
       />

        <ToastContainer />

     </div>


     <footer className='container mx-auto max-w-2xl pt-5 mb-5'>
         <div className='flex justify-center'>
            <p className='text-gray-500 text-sm'>© 2021 All rights reserved.</p>
         </div>
         <div className='flex justify-center'>
            <p className='text-gray-500 text-sm'>Made with ❤️ by <HoverCardDemo /></p>
         </div>
      </footer>
   </>
  )
}

export default React.memo(ProductPages)
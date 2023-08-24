import {useProducts} from "../feature/product/service/products.service";
import React, {useContext} from "react";
import {Loader} from "../shared/Loader";
import {Error} from "../shared/error/Error";
import Product from "../feature/product/Product";
import {CurrencyContext} from "../feature/nav/context/Currency.context";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { motion, useScroll } from "framer-motion"
import { getAuth } from '@firebase/auth'
import { app } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import {Footer} from "../shared/Footer";

function ProductPages() {
  const {currency} = useContext(CurrencyContext)

  const auth = getAuth(app)
  const [user] = useAuthState(auth)

  const { scrollYProgress } = useScroll()
  const {loading, error, products} = useProducts()

  return (
   <>
      {!user ? (
         <div className='container mx-auto max-w-2xl pt-5'>
            <div className='flex justify-center'>
               <p className='text-gray-500 text-sm'>Please, login to see the products</p>
            </div>
         </div>
      ) : (
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
   
         <Footer />
        </>
      ) }
   </>
  )
}

export default React.memo(ProductPages)
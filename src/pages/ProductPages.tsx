import {useProducts} from "../hooks/products-hooks";
import {useContext} from "react";
import {ModalContext} from "../context/ModalContext";
import {IProduct} from "../models";
import {Loader} from "../components/Loader";
import {Error} from "../components/Error";
import {Product} from "../components/Product";
import {Modal} from "../components/Modal";
import {CreateProduct} from "../components/CreateProduct";
import {CurrencyContext} from "../context/CurrencyContext";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export function ProductPages() {
  const {currency} = useContext(CurrencyContext)

  const {loading, error, products, addProduct} = useProducts()

  const {openModal, closeModal, modal} = useContext(ModalContext)

  const createHandler = (product: IProduct) => {
    closeModal()
    addProduct(product)
  }

  return (
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
       {modal &&
          <Modal title='Create new product' onClose={closeModal}>
            <CreateProduct onCreate={createHandler} />
          </Modal>
       }

       <ToastContainer />

       <button className='fixed bottom-5 right-5 rounded-full text-xl bg-yellow-400 w-[200px] h-[40px]' onClick={openModal}>Add Product</button>

     </div>
  )
}
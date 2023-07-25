import { IProduct } from '../product/Product.models';
import { ModalBucketCard } from './ModalBucketCard';
import { useAppSelector } from '../store/hooks/redux';
import { useContext } from 'react';
import { TotalPriceContext } from '../product/context/TotalPriceContext';
import { NavLink } from 'react-router-dom';
import { ModalContext } from './context/Modal.context';


export function ModalBucket() {
    const data = useAppSelector((state) => state.bucket.data)
    const { totalPrice } = useContext(TotalPriceContext)
    const { modal, setModal } = useContext(ModalContext)


    const toggle = () => {
        setModal(!modal)
    }


    if (data.length === 0) {
        return (
            <div className="flex absolute right-0 top-20">
                <div className="relative bg-white p-6 rounded-lg shadow-lg z-10 w-96">
                    <div className="mt-4">
                        <h2 className="text-lg text-center font-medium text-gray-900">
                            Bucket is empty
                        </h2>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="absolute right-0 top-20 mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col">
            <div className="mt-4">
              {data.map((product) => (
                <ModalBucketCard key={product.id} product={{ ...product } as IProduct} />
              ))}
            </div>
            <hr />
            <div className="flex justify-between items-center mt-4">
                <h2 className="text-lg font-medium text-gray-900 mt-4">
                Total: {totalPrice.toFixed(2)}
                </h2>
              <NavLink
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white"
                to="/bucket"
                onClick={toggle}
              >
                Confirm Order
              </NavLink>
            </div>
          </div>
        </div>
      )      
}

import {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {CurrencyContext} from "../context/CurrencyContext";
import {IProduct} from "../models";
import {getAuth} from "firebase/auth";
import {app} from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import {Badge} from "@mui/material";
import {CountContext} from "../context/CountItemsInBucketContext";


interface Props {
  products: IProduct[]
}

export function Navigation({ products }: Props) {
  const { currency, onToggleUsd, onToggleUah } = useContext(CurrencyContext)
  const {count} = useContext(CountContext)

  const [searchQuery, setSearchQuery] = useState("")

  const auth = getAuth(app)
  const [user] = useAuthState(auth)

  const filteredProducts = products.filter((product) =>
     product.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setSearchQuery(event.target.value);
  }

  return (
     <nav className="bg-white shadow-sm py-3">
       <div className="container mx-auto flex justify-between items-center px-4">
         <Link className="text-lg font-bold text-gray-900" to="/">
           React Shop
         </Link>
         <div className="flex items-center">
           <Link
              className="mx-4 text-gray-600 hover:text-gray-900"
              to="/"
           >
             Products
           </Link>
           <Link
              className="mx-4 text-gray-600 hover:text-gray-900"
              to="/bucket"
           >
             <Badge badgeContent={count} color="primary">Bucket</Badge>
           </Link>

           <div className="flex items-center border border-gray-300 rounded-lg p-2">
             <button
                className="text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 py-1 px-2 rounded-lg mr-2 focus:outline-none"
                onClick={onToggleUah}
             >
               {currency === "USD" ? "USD" : "UAH"}
             </button>
             <button
                className="text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 py-1 px-2 rounded-lg focus:outline-none"
                onClick={onToggleUsd}
             >
               {currency === "USD" ? "UAH" : "USD"}
             </button>
           </div>
           <div className="ml-4">
             <input
                type="text"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleInputChange}
             />

             {searchQuery.length >= 2 && (
                <div className="bg-gray-100 rounded-lg p-4 absolute mt-2 w-64 z-10">
                  {filteredProducts.length > 0 ? (
                     <ul>
                       {filteredProducts.map((product: IProduct) => (
                          <li key={product.id} className="text-gray-800 py-2 hover:bg-gray-200 cursor-pointer">
                            <span className='py-4'>
                              {product.title.split(" ").slice(0, 5).join(" ")}
                            </span>
                          </li>
                       ))}
                     </ul>
                  ) : (
                     <p className="text-gray-800">No products found</p>
                  )}
                </div>
             )}
           </div>

           {user && (
              <div className="flex items-center ml-4">
                <span className="text-gray-700 mr-2">Email: {user.email}</span>
                <AlertDialog.Root>
                  <AlertDialog.Trigger asChild>
                    <button className="text-violet11 hover:bg-mauve3 shadow-blackA7 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
                      Log Out
                    </button>
                  </AlertDialog.Trigger>
                  <AlertDialog.Portal>
                    <AlertDialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                    <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                      <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                        Are you absolutely sure?
                      </AlertDialog.Title>
                      <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                        This action cannot be undone. This will result in your account being logged out of our system
                      </AlertDialog.Description>
                      <div className="flex justify-end gap-[25px]">
                        <AlertDialog.Cancel asChild>
                          <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                            Cancel
                          </button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                          <button
                             className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                             onClick={() => auth.signOut()}
                          >
                            Yes, Log Out
                          </button>
                        </AlertDialog.Action>
                      </div>
                    </AlertDialog.Content>
                  </AlertDialog.Portal>
                </AlertDialog.Root>
              </div>
            )}

         </div>
       </div>
     </nav>
  );
}



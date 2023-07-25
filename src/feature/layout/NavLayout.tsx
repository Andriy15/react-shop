import { IProduct } from "../product/Product.models";
import {getAuth} from "firebase/auth";
import {app} from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { AlertDialogOut } from "../nav/AlertDialogOut";
import { NavLink } from "react-router-dom";
import { SearchQuery } from "../nav/SearchQuery";
import { Currency } from '../nav/Currency'
import { NavLinks } from '../nav/NavLinks'
import { Badge } from '@mui/material';
import { CountContext } from '../nav/context/CountItemsInBucketContext';
import { useContext } from 'react';
import { ModalContext } from "../bucket/context/Modal.context";
import { ModalBucket } from "../bucket/ModalBucket";

interface Props {
    products: IProduct[],
    children: React.ReactNode
}

export function NavLayout( {products, children}: Props ) {

    const auth = getAuth(app)
    const [user] = useAuthState(auth)

    const {count} = useContext(CountContext)
    const {modal, setModal} = useContext(ModalContext)

    const toggle = () => {
        setModal(!modal)
    }
  
    return (
        <>
            <nav className="bg-white shadow-sm py-3">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <NavLink className="text-2xl font-bold text-gray-900" to="/">
                        React Shop
                    </NavLink>
                    <div className="flex items-center">
                        
                        <NavLinks />

                        <Currency />
                        
                        <SearchQuery products={products} />

                        {user &&  <AlertDialogOut /> }

                        <Badge badgeContent={count} color="primary">
                            <button
                                onClick={toggle}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Bucket
                            </button>
                        </Badge>
                        {modal && <ModalBucket />}

                        {user?.email === "andriychikulay@gmail.com" && <NavLink className="text-gray-900 font-bold text-lg ml-4" to="/admin">Admin</NavLink>}
                    </div>
                </div>
            </nav>
            <main>
                {children}
            </main>
        </>
    )
}
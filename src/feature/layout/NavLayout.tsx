import { IProduct } from "../product/Product.models";
import { NavLink } from "react-router-dom";
import { SearchQuery } from "../nav/SearchQuery";
import { Currency } from '../nav/Currency'
import { NavLinks } from '../nav/NavLinks'
import { Badge } from '@mui/material';
import { CountContext } from '../nav/context/CountItemsInBucket.context';
import { useContext, useState } from 'react';
import { ModalContext } from "../bucket/context/Modal.context";
import { ModalBucket } from "../bucket/ModalBucket";
import { Dropdown } from "../nav/Dropdown";
import { Languages } from "../../shared/Languages";
import { Trans } from "@lingui/macro";
import { getAuth } from '@firebase/auth'
import { app } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

interface Props {
    products: IProduct[],
    children: React.ReactNode
}

export function NavLayout( {products, children}: Props ) {

    const {count} = useContext(CountContext)
    const {modal, setModal} = useContext(ModalContext)

    const auth = getAuth(app)
    const [user] = useAuthState(auth)

    const [state, setState] = useState(false)

    const toggleBucket = () => {
        setModal(!modal)
    }

    const toggleDropdown = () => {
        setState(!state)
    } 
  
    return (
        <>
           <nav className="bg-white shadow-sm py-3">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <NavLink className="text-2xl font-bold text-gray-900" to="/">
                        React Shop
                    </NavLink>

                    <div className="flex items-center">
                    {!user ? (
                            <div className="flex items-center">
                                <NavLink className="text-gray-500 hover:text-gray-700" to="/auth">
                                    <Trans>Login</Trans>
                                </NavLink>

                                <Languages /> 
                            </div>
                        ) : (
                            <>
                                <SearchQuery products={products} /> 
                                
                                <NavLinks /> 
                                
                                <Currency /> 

                                <div className="flex items-center">
                                    <Badge badgeContent={count} color="primary">
                                        <button
                                            onClick={toggleBucket}
                                            className="bg-blue-500 text-white py-2 px-4 ml-4 rounded hover:bg-blue-600"
                                        >
                                            <Trans>Bucket</Trans>
                                        </button>
                                    </Badge>
                                    {modal && <ModalBucket />} 
                                    
                                    <Dropdown state={state} setState={toggleDropdown} /> 
                                    
                                    <Languages /> 
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            <main>
                {children}
            </main>
        </>
    )
}
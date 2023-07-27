import { IProduct } from "../product/Product.models";
import { NavLink } from "react-router-dom";
import { SearchQuery } from "../nav/SearchQuery";
import { Currency } from '../nav/Currency'
import { NavLinks } from '../nav/NavLinks'
import { Badge } from '@mui/material';
import { CountContext } from '../nav/context/CountItemsInBucket.context';
import { useContext } from 'react';
import { ModalContext } from "../bucket/context/Modal.context";
import { ModalBucket } from "../bucket/ModalBucket";
import { Dropdown } from "../nav/Dropdown";
import { useState } from "react";

interface Props {
    products: IProduct[],
    children: React.ReactNode
}

export function NavLayout( {products, children}: Props ) {

    const {count} = useContext(CountContext)
    const {modal, setModal} = useContext(ModalContext)

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
                        
                        <NavLinks />

                        <Currency />
                        
                        <SearchQuery products={products} />

                        <Badge badgeContent={count} color="primary">
                            <button
                                onClick={toggleBucket}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Bucket
                            </button>
                        </Badge>
                        {modal && <ModalBucket />}

                        <Dropdown state={state} setState={toggleDropdown} />
                    </div>
                </div>
            </nav>
            <main>
                {children}
            </main>
        </>
    )
}
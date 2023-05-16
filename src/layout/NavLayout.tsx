import {IProduct} from "../models/models";
import {getAuth} from "firebase/auth";
import {app} from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { AlertDialogOut } from "../components/nav/AlertDialogOut";
import { NavLink } from "react-router-dom";
import { SearchQuery } from "../components/nav/SearchQuery";
import { Currency } from '../components/nav/Currency'
import { NavLinks } from '../components/nav/NavLinks'

interface Props {
    products: IProduct[],
    children: React.ReactNode
}


export function NavLayout( {products, children}: Props ) {

    const auth = getAuth(app)
    const [user] = useAuthState(auth)
  
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

                        {user?.email === "andriychikulay@gmail.com" && <NavLink className="text-gray-900 font-bold text-lg ml-4" to="/admin">Admin</NavLink>}
                    </div>
                </div>
            </nav>
            <main>
                {children}
            </main>
        </>
    );
}
import { NavLink } from 'react-router-dom';

export function NavLinks() {

    return (
        <>
            <NavLink
                className="mx-4 text-gray-600 hover:text-gray-900"
                to="/"
                >
                Products
            </NavLink>
            
            <NavLink
                className="mx-4 text-gray-600 hover:text-gray-900"
                to="/feedback"
                >
                Feedbacks
            </NavLink>
        </>
    )
}
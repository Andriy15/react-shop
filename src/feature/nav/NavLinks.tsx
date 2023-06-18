import { NavLink } from 'react-router-dom';
import { Badge } from '@mui/material';
import { CountContext } from './context/CountItemsInBucketContext';
import { useContext } from 'react';

export function NavLinks() {

    const {count} = useContext(CountContext)

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
                to="/bucket"
                >
                <Badge badgeContent={count} color="primary">Bucket</Badge>
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
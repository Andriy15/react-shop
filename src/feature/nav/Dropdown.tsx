import { getAuth } from '@firebase/auth'
import { app } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { NavLink } from 'react-router-dom'
import { AlertDialogOut } from './AlertDialogOut'
import { useState } from 'react'

interface Props {
  state: boolean
  setState: (state: boolean) => void
}


export function Dropdown( props: Props ) {

  const auth = getAuth(app)
  const [user] = useAuthState(auth)

  const [state, setState] = useState(false)

  const toggleDropdown = () => {
    setState(!state)
    props.setState(!state)
  }

  return (
    <div
      className="relative inline-block text-center ml-4"
      onMouseEnter={toggleDropdown}
      onMouseLeave={toggleDropdown}>
      <div>
        <button
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          {user?.displayName ? user?.displayName : user?.email}
        </button>
      </div>

      { props.state && 
        <div
          className="origin-top-right absolute right-0 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
          <div className="py-1 text-center">
            {user?.email === "andriychikulay@gmail.com" && <NavLink className="text-gray-900 font-bold text-lg" to="/admin">Admin</NavLink>}
            {user &&  <AlertDialogOut /> }
          </div>
        </div>
      }
    </div>
  )
}


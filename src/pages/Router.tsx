import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductPages from './ProductPages'
import { BucketPage } from './BucketPage'
import { AuthProvider } from '../feature/auth/AuthProvider'
import { readItemFromStorage } from '../feature/utils/handleStorage'
import { NavLayout } from '../feature/layout/NavLayout'
import { ErrorPage } from '../shared/error/404'
import AdminRoute from '../feature/admin/Admin'
import { getAuth } from 'firebase/auth'
import { app } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useProducts } from '../feature/product/hooks/products.hooks'
import Feedback from '../feature/feedback/Feedback'


function Router() {
  const { products } = useProducts()
  const [formSubmitted, setFormSubmitted] = useState(false)

  // checking auth for admin page
  const auth = getAuth(app)
  const [user] = useAuthState(auth)


  const handleFormSubmit = () => {
    setFormSubmitted(true)
  }


  if (!formSubmitted && !readItemFromStorage("user")) {
    return <AuthProvider submit={handleFormSubmit} />
  }

  return (
    <NavLayout products={products}>
      <Routes>
         <Route path="/" element={<ProductPages />} />
         <Route path="/bucket" element={<BucketPage />} />
         {user?.email === 'andriychikulay@gmail.com' && <Route path="/admin" element={<AdminRoute onSubmit={handleFormSubmit} />} />}
         <Route path="*" element={<ErrorPage />} />
         <Route path='/feedback' element={<Feedback />} />
      </Routes>
    </NavLayout>
 )
}

export default React.memo(Router)

// watch how to work firebase database with react 
// add route admin to App that provides access to admin page 
// in admin page add form to add new product
// new product should be added to firebase database
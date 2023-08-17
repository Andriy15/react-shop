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
import { Creator } from '../feature/creator/Creator'


function Router() {
  const { products } = useProducts()
  const [formSubmitted, setFormSubmitted] = useState(false)

  // checking auth for admin page
  const auth = getAuth(app)
  const [user] = useAuthState(auth)


  const handleFormSubmit = () => {
    setFormSubmitted(true)
  }

  return (
    <NavLayout products={products}>
      <Routes>
        <Route path='/auth' element={<AuthProvider />} />
         <Route path="/" element={<ProductPages />} />
         <Route path="/bucket" element={<BucketPage />} />
         {user?.email === 'andriychikulay@gmail.com' && <Route path="/admin" element={<AdminRoute onSubmit={handleFormSubmit} />} />}
         <Route path="*" element={<ErrorPage />} />
         <Route path='/feedback' element={<Feedback />} />
         <Route path='/creator' element={<Creator />} />
      </Routes>
    </NavLayout>
 )
}

export default React.memo(Router)

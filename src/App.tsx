import { Route, Routes, Navigate } from "react-router-dom";
import ProductPages from "./pages/ProductPages";
import { BucketPage } from "./pages/BucketPage";
import React, { useState } from "react";
import { useProducts } from "./hooks/products-hooks";
import { AdminLayout } from "./routing/AdminLayout";
import { readItemFromStorage } from "./utils/handleStorage";
import { NavLayout } from "./layout/NavLayout";


function App() {
  const { products} = useProducts()
  const [formSubmitted, setFormSubmitted] = useState(false)


  const handleFormSubmit = () => {
    setFormSubmitted(true)
  }
  

  if (!formSubmitted && !readItemFromStorage("user")) {
    return <AdminLayout submit={handleFormSubmit} />
  }

  // add to routes sign in and sign up pages and add component which will be rendered if user is not logged in 
  // add component Routes to App.tsx instead this structure
  // create component Redirect to check if user is logged in and if not it will redirect to sign in page
  // change AdminLayout to correct structure and add to it component Routes 
  return (
     <NavLayout products={products}>
       <Routes>
          <Route path="/" element={<ProductPages />} />
          <Route path="/bucket" element={<BucketPage />} />
          <Route path="*" element={<Navigate to="/signup" />} />
       </Routes>
     </NavLayout>
  )
}

export default React.memo(App)

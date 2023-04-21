import { Route, Routes, Navigate } from "react-router-dom";
import ProductPages from "./pages/ProductPages";
import { BucketPage } from "./pages/BucketPage";
import React, { useState } from "react";
import { useProducts } from "./hooks/products-hooks";
import { Navigation } from "./components/Navigation";
import { AdminLayout } from "./routing/AdminLayout";
import { readItemFromStorage } from "./helpers/handleStorage";


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
  return (
     <>
       <Navigation products={products} />
       <Routes>
          <Route path="/" element={<ProductPages />} />
          <Route path="/bucket" element={<BucketPage />} />
          <Route path="*" element={<Navigate to="/" />} />
       </Routes>
     </>
  )
}

export default React.memo(App)
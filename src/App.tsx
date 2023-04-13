import { Route, Routes, Navigate } from "react-router-dom";
import ProductPages from "./pages/ProductPages";
import { BucketPage } from "./pages/BucketPage";
import React, { useState } from "react";
import { useProducts } from "./hooks/products-hooks";
import { Navigation } from "./components/Navigation";
import { SignInForm } from "./components/SignInForm";
import { SignUpForm } from "./components/SignUpForm";
import { useCookies } from "react-cookie";


function App() {
  const { products} = useProducts()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [cookie] = useCookies(['user'])

  const handleFormSubmit = () => {
    setFormSubmitted(true)
  }

  const toggleSignUp = () => {
    setIsSignUp( prevIsSignUp => !prevIsSignUp)
  }

if (!cookie.user) {
  if (!formSubmitted) {
    if (isSignUp) {
      return <SignUpForm onSubmit={handleFormSubmit} onToggleSignUp={toggleSignUp} />
    } else {
      return <SignInForm onSubmit={handleFormSubmit} onToggleSignUp={toggleSignUp} />
    }
  }
  }


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

export default App
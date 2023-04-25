import React, { useState } from 'react'
import { SignInForm } from '../auth/SignInForm'
import { SignUpForm } from '../auth/SignUpForm'
import { Loader } from '../components/Loader'
import { useProducts } from '../hooks/products-hooks'
import { Routes, BrowserRouter, Route } from 'react-router-dom'

interface AdminLayoutProps {
  submit: () => void
}


// change this component to correct structure and add to it component Routes

export function AdminLayout(props: AdminLayoutProps) {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const { loading } = useProducts()

  const handleFormSubmit = () => {
    setFormSubmitted(true)
    props.submit()
  }

  const toggleSignUp = () => {
    setIsSignUp( prevIsSignUp => !prevIsSignUp)
  }

  if (loading) {
    return <Loader/>
  }


  if (!formSubmitted) {
    return (
      <>
        {isSignUp ? (
          <SignUpForm onSubmit={handleFormSubmit} onToggleSignUp={toggleSignUp} />
        ) : (
          <SignInForm onSubmit={handleFormSubmit} onToggleSignUp={toggleSignUp} />
        )}
      </>
    )
  }

  return (
    <></>
    // <Routes>
    //   <Route path='/' element={<SignInForm onSubmit={handleFormSubmit} onToggleSignUp={toggleSignUp} />} />
    //   <Route path='/signup' element={<SignUpForm onSubmit={handleFormSubmit} onToggleSignUp={toggleSignUp} />} />
    // </Routes>
  )
}
import React, { useState } from 'react'
import { SignInForm } from './SignIn.form'
import { SignUpForm } from './SignUp.form'
import { Loader } from '../../shared/Loader'
import { useProducts } from '../product/hooks/products.hooks'


export function AuthProvider() {
  const [isSignUp, setIsSignUp] = useState(false)
  const { loading } = useProducts()

  const handleFormSubmit = () => {
    setIsSignUp(true)
  }

  const toggleSignUp = () => {
    setIsSignUp( prevIsSignUp => !prevIsSignUp)
  }

  if (loading) {
    return <Loader/>
  }

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
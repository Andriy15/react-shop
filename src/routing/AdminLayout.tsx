import React, { useState } from 'react'
import { SignInForm } from '../auth/SignInForm'
import { SignUpForm } from '../auth/SignUpForm'
import { Loader } from '../components/Loader'
import { useProducts } from '../hooks/products-hooks'

interface AdminLayoutProps {
  submit: () => void
}


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

  //add adminLayout which will be check if user is logged in and if not it will render sign in or sign up form
  //add structure to routing component which will be check if user is logged in and if not it will render sign in or sign up form
  //add localStorage to save user data isntead of cookies
  //check in github any other way to check if user is logged in
  //add component Routes to App.tsx instead this structure
  return (
    <></> 
  )
}
import React, { useState } from 'react'
import { SignInForm } from './SignInForm'
import { SignUpForm } from './SignUpForm'
import { Loader } from '../components/Loader'
import { useProducts } from '../hooks/products-hooks'

interface AdminLayoutProps {
  submit: () => void
}


export function AuthProvider(props: AdminLayoutProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const { loading } = useProducts()

  const handleFormSubmit = () => {
    props.submit()
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
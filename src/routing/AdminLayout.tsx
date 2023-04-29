import React, { useState } from 'react'
import { SignInForm } from '../auth/SignInForm'
import { SignUpForm } from '../auth/SignUpForm'
import { Loader } from '../components/Loader'
import { useProducts } from '../hooks/products-hooks'

interface AdminLayoutProps {
  submit: () => void
}

// change this component to correct structure and add to it component Routes

export function AdminLayout(props: AdminLayoutProps) {
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
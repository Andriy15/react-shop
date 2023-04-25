import React from 'react'
import { render } from '@testing-library/react'
import App from './App'
import { SignInForm } from './auth/SignInForm'
import { Loader } from './components/Loader'
import { Navigation } from './components/Navigation'



test("Crushing App" , () => {
  const { getByText } = render(<App />)
  expect(getByText(/Loading.../i)).toBeInTheDocument()
})

test("Crushing Loader" , () => {
  const { getByText } = render(<Loader />)
  expect(getByText(/Loading.../i)).toBeInTheDocument()
})

test("Crushing Navigation" , () => {
  const { getByText } = render(<Navigation products={[]} />)
  expect(getByText(/Loading.../i)).toBeInTheDocument()
})

test("Crushing SignInForm" , () => {
  const { getByText } = render(<SignInForm onSubmit={function (): void {
    throw new Error('Function not implemented.')
  } } onToggleSignUp={function (): void {
    throw new Error('Function not implemented.')
  } }  />)
  expect(getByText(/Loading.../i)).toBeInTheDocument()
})

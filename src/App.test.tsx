import { render } from '@testing-library/react'
import { SignInForm } from './auth/SignInForm'
import App from './App'


test("Crushing SignInForm" , () => {
  const { getByText } = render(<SignInForm onSubmit={function (): void {
    throw new Error('Function not implemented.')
  } } onToggleSignUp={function (): void {
    throw new Error('Function not implemented.')
  } }  />)
})


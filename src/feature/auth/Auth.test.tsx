import { render } from '@testing-library/react'
import { SignInForm } from './SignInForm'
import AdminRoute from '../admin/Admin'


test("Crushing SignInForm" , () => {
  const { getByText } = render(<SignInForm onSubmit={function (): void {
    throw new Error('Function not implemented.')
  } } onToggleSignUp={function (): void {
    throw new Error('Function not implemented.')
  } }  />)
})


test("Crushing Admin" , () => {
  const { getByText } = render(<AdminRoute onSubmit={function (): void {
    throw new Error('Function not implemented.')
  } } />)
})

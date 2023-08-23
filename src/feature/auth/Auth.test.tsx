import { render } from '@testing-library/react'
import { SignInForm } from './sign-in/SignIn.form'
import AdminRoute from '../admin/Admin'


describe('SignInForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SignInForm onSubmit={() => {}} onToggleSignUp={() => {}} />)
    expect(baseElement).toBeTruthy()
  })
}
)

describe('AdminRoute', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminRoute onSubmit={function (): void {
      throw new Error('Function not implemented.')
    } } />)
    expect(baseElement).toBeTruthy()
  })
}
)



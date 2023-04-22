import React from 'react'
import { render } from '@testing-library/react'
import App from './App'


test("Crushing App" , () => {
  const { getByText } = render(<App />)
  expect(getByText(/Loading.../i)).toBeInTheDocument()
})

import * as yup from 'yup'
import { msg } from '@lingui/macro'
import { errorMessages } from './src/feature/auth/sign-in/SignIn.constants'

yup.setLocale({
  mixed: {
    required: errorMessages.required,
    default: 'field invalid',
  },
  number: {
    min: errorMessages.min,
    max: errorMessages.max,
  },
  string: {
    email: errorMessages.email,
  },
})
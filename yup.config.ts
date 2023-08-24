import * as yup from 'yup'
import { Fields, FORM_ERRORS } from './src/feature/auth/sign-in/SignIn.constants'

yup.setLocale({
    mixed: {
      required: FORM_ERRORS[Fields.email].required,
    },
    string: {
      min: FORM_ERRORS[Fields.password].minLength,
      email: FORM_ERRORS[Fields.email].pattern,
    },
  })
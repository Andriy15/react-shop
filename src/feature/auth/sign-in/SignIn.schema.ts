import * as yup from 'yup'
import { Fields } from './SignIn.constants'

export const SignInSchema = yup.object().shape({
    [Fields.email]: yup.string().required().email(),
    [Fields.password]: yup.string().required().min(8)
  })

import { msg } from '@lingui/macro'

export const texts = [
  { key: 0, text: msg`Sign In` },
  { key: 1, text: msg`Sign in with Google` },
  { key: 2, text: msg`Create account` },
]

export enum Fields {
  email = 'email',
  password = 'password'
}

export const FORM_LABELS = {
  [Fields.email]: msg`Email`,
  [Fields.password]: msg`Password`,
}

export const FORM_ERRORS = {
  [Fields.email]: {
    required: msg`Email is required`,
    pattern: msg`Invalid email`,
  },
  [Fields.password]: {
    required: msg`Password is required`,
    minLength: msg`Min length is 8 symbols`,
  },
}
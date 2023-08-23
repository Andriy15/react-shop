import { msg } from '@lingui/macro'

export const texts = [
  { key: 0, text: msg`Sign In` },
  { key: 1, text: msg`Sign in with Google` },
  { key: 2, text: msg`Create account` },
  { key: 3, text: msg`This field is required` },
  { key: 4, text: msg`Min length is 8 symbols` },
  { key: 5, text: msg`Invalid email`},
]

export enum Fields {
  email = 'email',
  password = 'password'
}

export const FORM_LABELS = {
  [Fields.email]: msg`Email`,
  [Fields.password]: msg`Password`,
}

// export const FORM_ERRORS = {
//   [Fields.email]: {
//     required: msg`Email is required`,
//     minLength: msg`Min length is 8 symbols`,
//     pattern: msg`Invalid email`,
//   },
//   [Fields.password]: {
//     required: msg`Password is required`,
//     minLength: msg`Min length is 8 symbols`,
//   },
// }
import { MessageDescriptor } from '@lingui/core'
import { msg } from '@lingui/macro'

type FieldError = {
  required: MessageDescriptor;
  minLength?: MessageDescriptor;
  pattern?: MessageDescriptor;
  symbols?: MessageDescriptor;
}

 interface Text {
  key: number;
  text: MessageDescriptor;
}

export const texts: Text[] = [
  { key: 0, text: msg`Sign In` },
  { key: 1, text: msg`Sign in with Google` },
  { key: 2, text: msg`Create account` },
]

export enum Fields {
  email = 'email',
  password = 'password'
}

export const FORM_LABELS: Record<Fields, MessageDescriptor> = {
  [Fields.email]: msg`Email`,
  [Fields.password]: msg`Password`,
}

export const initialValues: Record<Fields, string> = {
  [Fields.email]: '',
  [Fields.password]: '',
}

export const FORM_ERRORS: Record<Fields, FieldError> = {
  [Fields.email]: {
    required: msg`Email is required`,
    pattern: msg`Invalid email`,
    symbols: msg`Don't use special symbols`,
  },
  [Fields.password]: {
    required: msg`Password is required`,
    minLength: msg`Min length is 8 symbols`,
  },
}

export const errorMessages = {
  required: msg`This field is required`,
  email: msg`Invalid email`,
  min: ({ min }: {min: number}) => msg`Min length is ${min} symbols`,
  max: ({ max }: {max: number}) => msg`Max length is ${max} symbols`,
}

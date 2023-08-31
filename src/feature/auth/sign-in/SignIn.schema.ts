import * as yup from "yup";
import { Fields } from "./SignIn.constants";
import { errorMessages } from "./SignIn.constants";

export const SignInSchema = yup.object().shape({
  [Fields.email]: yup.string()
    .required(errorMessages.required)
    .email(errorMessages.email)
    .max(255, errorMessages.max)
    .min(8, errorMessages.min)
    .matches(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)
    .trim(),
  [Fields.password]: yup.string()
    .required(errorMessages.required)
    .min(8, errorMessages.min)
    .max(255, errorMessages.max)
})
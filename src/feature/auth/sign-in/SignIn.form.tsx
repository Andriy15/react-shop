import { useForm } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../firebase";
import { FirebaseError } from '@firebase/util';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setItemToStorage } from '../../utils/handleStorage'
import { TextField } from '@mui/material';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FORM_ERRORS, Fields, texts } from './SignIn.constants'
import { useLingui } from '@lingui/react';
import { yupResolver } from '@hookform/resolvers/yup'
import { SignInSchema } from './SignIn.schema'
import { FORM_LABELS } from './SignIn.constants';

interface SignInFormData {
  email: string
  password: string
}

interface SignInFormProps {
  onSubmit: () => void
  onToggleSignUp: () => void
}

export function SignInForm(props: SignInFormProps) {
  const { i18n } = useLingui()

  const { handleSubmit, register, formState: { errors } } = useForm<SignInFormData>({
    resolver: yupResolver(SignInSchema)
  })

  const auth = getAuth(app)
  const navigate = useNavigate()

  const onSubmit = async (data: SignInFormData) => {
    try {
      const result = await signInWithEmailAndPassword(auth, data.email, data.password)
      const user = result.user
      setItemToStorage('user', user.email)
      props.onSubmit()
      navigate('/')
    } 
    catch (error: unknown) {
      const firebaseError = error as FirebaseError
      toast.error(firebaseError.code, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }


  const onGoogleSubmit = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      setItemToStorage('user', user.email)
      props.onSubmit()
      navigate('/')
    }
    catch (error: unknown) {
      const firebaseError = error as FirebaseError
      toast.error(firebaseError.code, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
  }
}


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-100 rounded-lg shadow-md p-8 w-80 m-auto mt-10"
      >
      <h2 className="text-2xl font-medium mb-4">{i18n._(texts[0].text)}</h2>
      <hr className="mb-6" />
      <div className="mb-4">
        <TextField
          id="email"
          type="email"
          {...register("email")}
          variant="outlined"
          label={i18n._(FORM_LABELS[Fields.email])}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        />
        {errors.email && (
          <span className="text-red-600">
            {errors.email.type === "required"
              ? i18n._(FORM_ERRORS[Fields.email].required)
              : i18n._(FORM_ERRORS[Fields.email].pattern)}
          </span>
        )}
      </div>
      <div className="mb-4">
        <TextField
          id="password"
          type="password"
          {...register("password")}
          variant="outlined"
          label={i18n._(FORM_LABELS[Fields.password])}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        />
        {errors.password && (
          <span className="text-red-600">
            {errors.password.type === "required"
              ? i18n._(FORM_ERRORS[Fields.password].required)
              : i18n._(FORM_ERRORS[Fields.password].minLength)}
          </span>
        )}
      </div>
      <div className="flex justify-between ">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
        >
          {i18n._(texts[0].text)}
        </button>
        <div className="flex justify-center">
          <button
            type="button"
            className="bg-gray-200 hover:bg-gray-300 text-blue-500 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full"
            onClick={props.onToggleSignUp}
          >
            {i18n._(texts[2].text)}
          </button>
        </div>
      </div>
      <div className="mt-6">
        <hr />
        <div className="flex flex-col justify-center mt-6 ">
          <button
              type="button"
              className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:bg-opacity-70 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline mb-4 flex justify-center items-center space-x-2"
              onClick={onGoogleSubmit}
            >
              <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="google" className="h-5 w-5" />
              <span>{i18n._(texts[1].text)}</span>
          </button>
        </div>
      </div>
      <div>
        <ToastContainer />
      </div>
    </form>
  )
}

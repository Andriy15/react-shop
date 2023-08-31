import { useForm } from 'react-hook-form';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import {app} from "../../../firebase";
import { FirebaseError } from 'firebase/app';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setItemToStorage } from '../../utils/handleStorage';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignInSchema } from '../sign-in/SignIn.schema';
import { FORM_ERRORS, FORM_LABELS, Fields } from '../sign-in/SignIn.constants';
import { useLingui } from '@lingui/react';
import { transText } from './SignUp.constants'; 


interface SignUpProps {
  onSubmit: () => void
  onToggleSignUp: () => void
}

interface SignUnFormData {
  email: string
  password: string
}

export function SignUpForm(props: SignUpProps) {
  const { i18n } = useLingui()


  const { register, handleSubmit, formState: { errors } } = useForm<SignUnFormData>({
    resolver: yupResolver(SignInSchema)
  })
  const auth = getAuth(app)

  const navigate = useNavigate()


  const onSubmit = async (data: SignUnFormData) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password)
      setItemToStorage('user', data.email)
      props.onSubmit()
      navigate('/')
    } catch (error: unknown) {
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

  const getErrorMessage = (field: Fields) => {
    switch (field) {
      case Fields.email:
        return i18n._(errors.email?.message || '');
  
      case Fields.password:
        return i18n._(errors.password?.message || '');
  
      default:
        return ''
    }
  }

  return (
     <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 rounded-lg shadow-md p-8 w-80 mx-auto mt-10">
       <h2 className="text-2xl font-medium mb-4">{i18n._(transText[0].text)}</h2>
       <div className="mb-4">
       <TextField
          id='email'
          type='email'
          {...register('email')} 
          variant='outlined' 
          label={i18n._(FORM_LABELS[Fields.email])} 
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        />
       {errors.email && (
          <span className="text-red-600">
            {getErrorMessage(Fields.email)} 
          </span>
        )}
       </div>
       <div className="mb-4">
       <TextField 
          id='password' 
          type='password' 
          {...register('password')} 
          variant='outlined' 
          label={i18n._(FORM_LABELS[Fields.password])} 
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" 
        />
       {errors.password && (
          <span className="text-red-600">
            {getErrorMessage(Fields.password)} 
          </span>
        )}
       </div>
       <div className="flex flex-col justify-center max-w-full">
         <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full h-10 mb-4"
         >
           {i18n._(transText[0].text)}
         </button>
          <button
              type="submit"
              className="bg-gray-200 hover:bg-gray-300 text-blue-500 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full h-10"
              onClick={props.onToggleSignUp}
          >
            {i18n._(transText[1].text)}
          </button>
       </div>
       <div>
         <ToastContainer />
       </div>
     </form>
  )
}

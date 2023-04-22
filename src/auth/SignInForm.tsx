import { useForm } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import { FirebaseError } from '@firebase/util';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setItemToStorage } from '../utils/handleStorage'
import { TextField } from '@mui/material';


interface SignInFormData {
  email: string
  password: string
}

interface SignInFormProps {
  onSubmit: () => void
  onToggleSignUp: () => void
}

export function SignInForm(props: SignInFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>()
  const auth = getAuth(app)
  

  const onSubmit = async (data: SignInFormData) => {
    try {
      const result = await signInWithEmailAndPassword(auth, data.email, data.password)
      const user = result.user
      setItemToStorage('user', user.email)
      props.onSubmit()
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
        className="bg-gray-100 rounded-lg shadow-md p-8 w-80 m-auto"
    >
      <h2 className="text-2xl font-medium mb-4">Sign In</h2>
      <div className="mb-4">
        <TextField id='email' type='email' {...register('email', { required: true })} variant='outlined' label='Email' className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" />
        {errors.email && <span className="text-red-600">This field is required</span>}
      </div>
      <div className="mb-4">
        <TextField id='password' type='password' {...register('password', { required: true, minLength: 8 })} variant='outlined' label='Password' className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" />
        {errors.password?.type === "required" && <span className="text-red-600">This field is required</span>}
        {errors.password?.type === "minLength" && <span className="text-red-600">Min length is 8 symbols</span>}
      </div>
      <div className="flex justify-between ">
        <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
        >
          Sign In
        </button>
        <div className="flex justify-center">
          <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 text-blue-500 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full h-10"
              onClick={props.onToggleSignUp}
          >
            Create Account
          </button>
        </div>
      </div>
      <div>
        <ToastContainer />
      </div>
    </form>
  )
}

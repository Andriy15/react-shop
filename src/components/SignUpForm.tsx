import { useForm } from 'react-hook-form';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import {app} from "../firebase";
import {useEffect, useState} from "react";
import { User } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SignUpProps {
  onSubmit: (formData: SignUnFormData) => void
  onToggleSignUp: () => void
}

interface SignUnFormData {
  email: string
  password: string
  name: string
}

interface CustomUser extends User {
  updateProfile: (profile: { displayName?: string | null; photoURL?: string | null; }) => Promise<void>
}

export function SignUpForm(props: SignUpProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUnFormData>()
  const auth = getAuth(app)
  const [user, setUser] = useState(auth.currentUser)


  useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => {
      if (user !== null) {
        return setUser(user)
      }
    })

    return unsub
  }, [auth])

  const onSubmit = async (data: SignUnFormData) => {
    try {
      const { email, password, name } = data

      await createUserWithEmailAndPassword(auth, email, password)

      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const customUser = userCredential.user as CustomUser

      await customUser.updateProfile({ displayName: name })
      props.onSubmit(data)
    } catch (error: any) {
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
     <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 rounded-lg shadow-md p-8 w-80 mx-auto">
       <h2 className="text-2xl font-medium mb-4">Sign Up</h2>
       <div className="mb-4">
         <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
         <input type="text" {...register('name', { required: true })} id="name" className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" />
         {errors.name && <span className='text-red-600'>This field is required</span>}
       </div>
       <div className="mb-4">
         <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
         <input type="email" {...register('email', { required: true })} id="email" className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" />
         {errors.email && <span className="text-red-600">This field is required</span>}
       </div>
       <div className="mb-4">
         <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
         <input type="password" {...register('password', { required: true, minLength: 8 })} id="password" className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" />
         {errors.password?.type === 'required' && <span className="text-red-600">This field is required</span>}
         {errors.password?.type === 'minLength' && <span className="text-red-600">Min length is 8 symbols</span>}
       </div>
       <div className="flex flex-col justify-center max-w-full">
         <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full h-10 mb-4"
         >
           Sign Up
         </button>
         <button
            type="submit"
            className="bg-gray-200 hover:bg-gray-300 text-blue-500 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full h-10"
            onClick={props.onToggleSignUp}
         >
           Already have an account?
         </button>
       </div>
       <div>
         <ToastContainer />
       </div>
     </form>
  )
}

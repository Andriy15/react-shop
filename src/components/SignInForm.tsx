import { useForm } from 'react-hook-form';

interface SignInFormData {
  email: string;
  password: string;
}

interface SignInFormProps {
  onSubmit: () => void;
  onToggleSignUp: () => void;
}



export function SignInForm(props: SignInFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>()

  const onSubmit = (data: SignInFormData) => {
    //@ts-ignore
    props.onSubmit(data)
    console.log(data)
  }

  return (
     <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-100 rounded-lg shadow-md p-8 w-80 mx-auto"
     >
       <h2 className="text-2xl font-medium mb-4">Sign In</h2>
       <div className="mb-4">
         <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
           Email
         </label>
         <input
            type="email"
            {...register('email', { required: true })}
            id="email"
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            placeholder='example@gmail.com'
         />
         {errors.email && <span className="text-red-600">This field is required</span>}
       </div>
       <div className="mb-4">
         <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
           Password
         </label>
         <input
            type="password"
            {...register('password', { required: true, minLength: 8 })}
            id="password"
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            placeholder='Enter a password'
         />
         {errors.password?.type === "required" && <span className="text-red-600">This field is required</span>}
         {errors.password?.type === "minLength" && <span className="text-red-600">Min length is 8 symbols</span>}
       </div>
       <div className="flex justify-between">
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
     </form>
  );
}
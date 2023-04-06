import {FormEvent, useState} from "react";
import {IProduct} from "../models";
import axios from "axios";
import {Error} from "./Error";

const productData: IProduct = {
  title: '',
  price: 13.5,
  description: 'lorem ipsum set',
  image: 'https://i.pravatar.cc',
  category: 'electronic',
  rating: {
    rate: 31,
    count: 20
  }
}

interface CreateProductProps {
  onCreate: (product: IProduct) => void
}

export function CreateProduct({onCreate}: CreateProductProps) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const submitHandler = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    setError('')

    if (value.trim().length === 0) {
      return setError('Please enter valid title')
    }

    productData.title = value
    const response = await axios.post('https://fakestoreapi.com/products', productData)

    onCreate(response.data)

  }


  return (
     <form onSubmit={submitHandler}>
       <input
          type="text"
          className='border py-2 px-4 mb-2 w-full outline-0'
          placeholder='Enter product title...'
          value={value}
          onChange={event => setValue(event.target.value)}
       />

       {error && <Error error={error} />}

       <button type='submit'
               className='py-2 px-4 border bg-yellow-400 hover:text-yellow-400 hover:bg-black transition ease-in .4s'
       >Create
       </button>
     </form>
  )
}
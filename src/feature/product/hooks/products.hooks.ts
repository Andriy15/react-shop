import {useEffect, useState} from "react";
import { IProduct } from "../Product.models";
import axios, {AxiosError} from "axios";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../../firebase";

export function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

//   const getProducts = async () => {
//     const productCol = collection(db, "products")
//     const snapshot = await getDocs(productCol)

//     const products = snapshot.docs.map(doc => doc.data() as IProduct)
//     setProducts(products)

//     console.log(products)
//   }

  async function fetchProducts() {
    try {
      setError('')
      setLoading(true)
      const response = await axios.get<IProduct[]>('https://fakestoreapi.com/products')
      setProducts(response.data)
      setLoading(false)

    } catch (e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchProducts()
    // getProducts()
  }, [])


  return {error, loading, products}
}
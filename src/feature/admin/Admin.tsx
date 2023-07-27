import { useForm } from "react-hook-form";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query } from "firebase/firestore"; 
import { db } from "../../firebase";
import React, { useEffect, useRef, useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import Popup from "reactjs-popup";
import { useInView } from "framer-motion";
import { IProduct } from "../product/Product.models";
import Product from "../product/Product";
import { CurrencyContext } from "../nav/context/Currency.context";


interface SubmitProps {
  onSubmit: () => void
}

// add file start.mdx before sign in page and need to import mdxjs-react
function Admin(props: SubmitProps) {
  const [products, setProducts] = useState<IProduct[]>([])
  const [editing, setEditing] = useState(false)
  const [docsId, setDocsId] = useState<string[]>([])

  const { currency } = useContext(CurrencyContext)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<IProduct>()

  // checking if admin page in view
  const ref = useRef(null)
  const isInView = useInView(ref)

  useEffect(() => {
    getProducts()
  }, [isInView])

  //pop up settings
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  // form submit
  const onSubmit = async (data: IProduct) => {
    await addProduct(data)
    props.onSubmit()
  }


  const addProduct = async (product: IProduct) => {
    try {
      const docRef = await addDoc(collection(db, "products"), product)
      props.onSubmit()
      setDocsId([...docsId, docRef.id])
      toast.success(`Product added successfully with id ${docRef.id}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      })
      reset()
      await getProducts()
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }
  
  // should to fix editing product 
  const editProduct = async (e: React.MouseEvent<HTMLButtonElement>, product: IProduct) => {
    e.preventDefault()
    try {
      const snapshot = await getDocs(collection(db, "products"))
      const productRef = doc(db, "products", snapshot.docs[0].id)
      await updateDoc(productRef, product)
      setEditing(true)
      props.onSubmit()
      await getProducts()
    } catch (e) {
      console.error("Error editing document: ", e)
    }
  }
  
  const getProducts = async () => {
    const productCol = collection(db, "products")
    const snapshot = await getDocs(productCol)

    const products = snapshot.docs.map(doc => doc.data() as IProduct)
    setProducts(products)
    console.log(docsId)
  }


  // should to fix deleting product by documentId 
  const deleteProduct = async (e: React.MouseEvent<HTMLButtonElement>, product: IProduct) => {
    e.preventDefault()
    try {
      // const snapshot = await getDocs(collection(db, "products"))
      const productRef = doc(db, "products", docsId[product.id])
      await deleteDoc(productRef)
      props.onSubmit()
      toast.error('Product was deleted successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      })
      await getProducts()
    } catch (e) {
      console.error("Error removing document: ", e)
    }
  }

  return (
    <div ref={ref}>
      <button onClick={handleOpen} className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Product</button>
      <Popup open={isOpen} onClose={handleClose}>
        <div className="max-w-md mx-auto mt-8 h-96 overflow-y-scroll">
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8">
            <div className="mb-4">
              <label htmlFor="id" className="block text-gray-700 font-bold mb-2">Id</label>
              <input type="text" {...register("id", { required: true })} id="id"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.id ? 'border-red-500' : ''}`}
              />
              {errors.id && <span className="text-red-500 text-sm">{errors.id.message || 'Це поле обов\'язкове'}</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
              <input type="text" {...register("title", { required: true })} id="title"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? 'border-red-500' : ''}`}
              />
              {errors.title && <span className="text-red-500 text-sm">{errors.title.message || 'Це поле обов\'язкове'}</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
              <textarea {...register("description", { required: true })} id="description"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.description ? 'border-red-500' : ''}`}
              />
              {errors.description && <span className="text-red-500 text-sm">{errors.description.message || 'Це поле обов\'язкове'}</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
              <input type="number" step="0.01" {...register("price", { required: true })} id="price"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.price ? 'border-red-500' : ''}`}
              />
              {errors.price && <span className="text-red-500 text-sm">{errors.price.message || 'Це поле обов\'язкове'}</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
              <input type="text" {...register("category", { required: true })} id="category"
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
              {errors.category && <span className="text-red-500 text-sm">{errors.category.message || 'Це поле обов\'язкове'}</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image</label>
              <input type="text" {...register("image", { required: true })} id="image"
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
              {errors.image && <span className="text-red-500 text-sm">{errors.image.message || 'Це поле обов\'язкове'}</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="rating.rate" className="block text-gray-700 font-bold mb-2">Rate</label>
              <input type="number" {...register("rating.rate", { required: true, min: 0, max: 5 })} id="rating.rate"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.rating?.rate ? 'border-red-500' : ''}`}
              />
              {errors.rating?.rate && <span className="text-red-500 text-sm">The rate should be between 0 and 5</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="rating.count" className="block text-gray-700 font-bold mb-2">Count</label>
              <input type="number" {...register("rating.count", { required: true, min: 0 })} id="rating.count"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.rating?.count ? 'border-red-500' : ''}`}
              />
              {errors.rating?.count && <span className="text-red-500 text-sm">The count should be a positive number</span>}
            </div>

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleClose}>Add product</button>

          </form>
        </div>
      </Popup>

      <ToastContainer />

      <div className="container mx-auto max-w-2xl pt-5">
        {products.map((product: IProduct) => (
          <>
            <Product product={product} currency={currency} key={product.id} />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2" onClick={(e) => editProduct(e, product)}>Edit</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-5" onClick={(e) => deleteProduct(e, product)}>Delete</button></>
        ))}
      </div>

      {editing && 
      <Popup open={editing} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
            <input type="text" {...register("title", { required: true })} id="title"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? 'border-red-500' : ''}`}
            />
            {errors.title && <span className="text-red-500 text-sm">{errors.title.message || 'This field is required'}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea {...register("description", { required: true })} id="description"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <span className="text-red-500 text-sm">{errors.description.message || 'This field is required'}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
            <input type="number" {...register("price", { required: true, min: 0 })} id="price"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.price ? 'border-red-500' : ''}`}
            />
            {errors.price && <span className="text-red-500 text-sm">{errors.price.message || 'This field is required'}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
            <input type="text" {...register("category", { required: true })} id="category"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.category ? 'border-red-500' : ''}`}
            />
            {errors.category && <span className="text-red-500 text-sm">{errors.category.message || 'This field is required'}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image</label>
            <input type="text" {...register("image", { required: true })} id="image"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.image ? 'border-red-500' : ''}`}
            />
            {errors.image && <span className="text-red-500 text-sm">{errors.image.message || 'This field is required'}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="rating.rate" className="block text-gray-700 font-bold mb-2">Rate</label>
            <input type="number" {...register("rating.rate", { required: true, min: 0, max: 5 })} id="rating.rate"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.rating?.rate ? 'border-red-500' : ''}`}
            />
            {errors.rating?.rate && <span className="text-red-500 text-sm">The rate should be between 0 and 5</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="rating.count" className="block text-gray-700 font-bold mb-2">Count</label>
            <input type="number" {...register("rating.count", { required: true, min: 0 })} id="rating.count"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.rating?.count ? 'border-red-500' : ''}`}
            />
            {errors.rating?.count && <span className="text-red-500 text-sm">The count should be greater than 0</span>}
          </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleClose}>Edit product</button>

        </form>
      </Popup>}

      {products.length === 0 && <div className="text-center text-xl">No products</div>}

    </div>
  )
}

export default React.memo(Admin)
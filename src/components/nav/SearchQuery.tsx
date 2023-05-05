import React, { useState } from 'react'
import { IProduct } from '../../models'

interface SearchQueryProps {
    products: IProduct[]
}

export function SearchQuery({ products }: SearchQueryProps) {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredProducts = products.filter((product) =>
       product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault()
      setSearchQuery(event.target.value)
    }

    return (
        <div className="ml-4">
            <input
                type="text"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleInputChange}
            />

            {searchQuery.length >= 2 && (
                <div className="bg-gray-100 rounded-lg p-4 absolute mt-2 w-64 z-10">
                    {filteredProducts.length > 0 ? (
                        <ul>
                        {filteredProducts.map((product: IProduct) => (
                            <li key={product.id} className="text-gray-800 py-2 hover:bg-gray-200 cursor-pointer">
                                <span className='py-4'>
                                {product.title.split(" ").slice(0, 5).join(" ")}
                                </span>
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <p className="text-gray-800">No products found</p>
                    )}
                </div>
            )}
        </div>
    )
}
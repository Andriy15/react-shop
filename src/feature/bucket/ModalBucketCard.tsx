import { IModalBucket } from './Bucket.modals';


export function ModalBucketCard({ product }: IModalBucket) {

  return (
        <>
            <div className="flex items-center">
                <img
                className="w-24 h-24 object-cover"
                src={product.image}
                alt={product.title}
                />
                <div className="flex flex-col ml-4">
                    <h2 className="text-lg font-medium text-gray-900">
                        {product.title}
                    </h2>
                    <p className="text-sm font-medium text-gray-500">
                        Category: {product.category}
                    </p>
                    <p className="text-lg font-medium text-gray-900">
                        Price: {product.price}
                    </p>
                </div>
            </div>
        </>
  )
}

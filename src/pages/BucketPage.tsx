import { useAppSelector } from "../hooks/redux";
import { Link } from "react-router-dom";
import { BoughtProducts } from "../components/BoughtProducts";
import { useContext } from "react";
import { CurrencyContext } from "../context/CurrencyContext";
import { IProduct } from "../models";

interface ProductProps extends IProduct {
  currency: string;
}

export function BucketPage() {
  const data = useAppSelector((state) => state.bucket.data);
  const { currency } = useContext(CurrencyContext);

  if (data.length === 0)
    return (
       <p className="text-center">
         No products... Go to<Link to="/" className="text-blue-400"> buy</Link>
       </p>
    );

  return (
     <div className="flex justify-center h-screen pt-10 mx-auto w-screen">
       <div className="h-screen w-auto">
         {data.map((product) => (
            <BoughtProducts
               product={{ ...product } as ProductProps}
               key={product.id}
               currency={currency}
            />
         ))}
       </div>
     </div>
  );
}

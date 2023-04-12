import React, { useState } from "react";

interface DetailsProductProps {
  showDetails: string;
  hideDetails: string;
  onDetails: (details: boolean) => void
}

export function ButtonDetailsProduct(props: DetailsProductProps) {
  const [details, setDetails] = useState(false)

  const btnBgClassName = details ? "bg-yellow-400" : "bg-blue-400"

  const btnClasses = ["py-2 px-4 border", btnBgClassName].join(" ")

  const buttonStyles = {
    padding: "10px 20px",
    borderRadius: "5px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  }

  const handleClick = () => {
    setDetails(!details)
    props.onDetails(!details)
  };


  return (
     <div className='flex flex-col'>
       <button
          className={btnClasses}
          style={buttonStyles}
          onClick={handleClick}
       >
         {details
          ? props.hideDetails
          : props.showDetails
          }
       </button>
     </div>
  );
}
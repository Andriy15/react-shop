import React, { useState } from "react";

interface DetailsProductProps {
  showDetails: string;
  hideDetails: string;
  onDetails: (details: boolean) => void; // Update the type of onDetails callback
}

export function ButtonDetailsProduct(props: DetailsProductProps) {
  const [details, setDetails] = useState(false); // Update the initial value of details state

  const btnBgClassName = details ? "bg-yellow-400" : "bg-blue-400";

  const btnClasses = ["py-2 px-4 border", btnBgClassName].join(" ");

  const buttonStyles = {
    padding: "10px 20px",
    borderRadius: "5px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  }

  const handleClick = () => {
    setDetails(!details); // Toggle the value of details state
    props.onDetails(!details); // Call the onDetails callback with the updated value of details state
  };


  return (
     <div className='flex flex-col'>
       <button
          className={btnClasses}
          style={buttonStyles}
          onClick={handleClick}
       >
         {details ? props.hideDetails : props.showDetails}
       </button>
     </div>
  );
}
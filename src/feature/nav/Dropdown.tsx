import React, { useState } from "react";
import { AlertDialogOut } from "./AlertDialogOut";

export function Dropdown() {
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => {
    setDropdown(!dropdown);
  };

  return (
    <div className="relative">
      <button
        className={`relative bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded ml-4 transition-colors duration-300 ${
          dropdown ? "bg-blue-500" : ""
        }`}
        onClick={handleClick}
      >
        Profile
        <span
          className={`absolute right-3 top-1/2 transform transition-transform duration-300 ${
            dropdown ? "rotate-180" : "rotate-0"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M5 10l7 7 7-7" />
          </svg>
        </span>
      </button>
      {dropdown && (
        <div className="absolute right-0 mt-3 w-40 bg-white rounded-lg shadow-lg z-10">
          <AlertDialogOut />
        </div>
      )}
    </div>
  );
}


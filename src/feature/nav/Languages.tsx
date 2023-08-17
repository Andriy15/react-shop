import React, { useState } from "react"
import { useLingui } from "@lingui/react";
import { setItemToStorage } from "../utils/handleStorage";

 
export function Languages() {
    const { i18n } = useLingui()
    const [isModal, setIsModal] = useState(false)
    
    const changeLanguage = (language: string) => {
        i18n.activate(language)
        setItemToStorage("language", language)
    }

    const toggleModal = () => {
        setIsModal(!isModal)
    }
    
    return (
        <div className="relative inline-block text-left ml-4">
            <div>
                <button
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    onClick={toggleModal}
                >
                    {i18n.locale}
                    <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.293 7.293a1 1 0 011.414 0L10 8.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
                        />
                    </svg>
                </button>
            </div>

            {isModal && 
            <div
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            >
                <div className="py-1">
                    <button
                        onClick={() => changeLanguage("en")}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                        English
                    </button>
                    <button
                        onClick={() => changeLanguage("uk")}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                        Ukraine
                    </button>
                </div>
            </div>
            }
        </div>
    )
    }
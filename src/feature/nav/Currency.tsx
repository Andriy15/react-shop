import {CurrencyContext} from "./context/CurrencyContext";
import {useContext} from "react";


export function Currency() {

    const { currency, onToggleUsd, onToggleUah } = useContext(CurrencyContext)

    return (
        <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <button
                className="text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 py-1 px-2 rounded-lg mr-2 focus:outline-none"
                onClick={onToggleUah}
            >
            {currency === "USD" ? "USD" : "UAH"}
            </button>
            <button
                className="text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 py-1 px-2 rounded-lg focus:outline-none"
                onClick={onToggleUsd}
            >
            {currency === "USD" ? "UAH" : "USD"}
            </button>
        </div>
    )
}
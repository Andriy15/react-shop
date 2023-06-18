import { Link } from "react-router-dom";

export function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-gray-900">404 | Page not found</h1>
            <h3 className="text-2xl font-bold text-gray-900">Please <Link to='/' className="text-blue-400">go back</Link> to home</h3>
        </div>
    )
}
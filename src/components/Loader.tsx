import { useState, useEffect } from 'react';

export function Loader() {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDotCount((prevCount) => (prevCount + 1) % 4);
    }, 500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <svg
        className="animate-spin h-5 w-5 mr-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 016.3 14H4.02a10.013 10.013 0 003.465 3.295l-.554-.004zM12 20a8 8 0 008-8h-4a4 4 0 11-8 0H4a8 8 0 008 8zm2-5.291a7.962 7.962 0 01-1.7 1.291l.555.004A10.013 10.013 0 0019.98 12h-2.28a7.963 7.963 0 01-1.7 6.709z"
        ></path>
      </svg>
      <p className="text-lg font-medium text-gray-700">
        {dotCount === 0 && 'Loading'}
        {dotCount === 1 && 'Loading.'}
        {dotCount === 2 && 'Loading..'}
        {dotCount === 3 && 'Loading...'}
      </p>
    </div>
  );
}

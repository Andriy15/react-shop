interface ErrorProps {
  error: string
}

export function Error({error}: ErrorProps) {
  return(
     <p className='text-center text-red-600'>{error}</p>
  )
}
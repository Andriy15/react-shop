export interface IProduct {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  [key: `${string}.${string}`]: any,
  rating: {
    rate: number,
    count: number
  }
}

export interface IFeedback {
  text: string,
  date: string
}
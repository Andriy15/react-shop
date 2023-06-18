export function calculateValue(currency: string, price: number): number {
    if (currency === "uah") {
      return price * 40;
    } 
    return price;
  }


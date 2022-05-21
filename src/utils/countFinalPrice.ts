export function countFinalPrice(prices: number[]) {
  let finalPrice = 0;
  prices.forEach((price) => {
    finalPrice += price;
  });

  return finalPrice;
}

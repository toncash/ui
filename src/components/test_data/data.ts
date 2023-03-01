function createData(
  username: string,
  amount: number,
  price: number,
  currency: string,
  orderType: string,
) {
  return { username, amount, price, currency, orderType };
}
export const orders = [
  createData("Admin", 100, 2.45, "USD", "SELL"),
  createData("vasya", 50, 2.46, "EUR", "BUY"),
  createData("petya", 1000, 2.41, "NIS", "SELL"),
  createData("nafanya5000", 500, 2.44, "BYN", "BUY"),
];

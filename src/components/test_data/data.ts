function createData(
  username: string,
  amount: number,
  price: number,
  currency: string,
  orderType: string,
  limit: number,
  total: number,
  totalClosed: number,
  location: {
    lat: number;
    lng: number;
  }
) {
  return {
    username,
    amount,
    price,
    currency,
    orderType,
    limit,
    total,
    totalClosed,
    location,
  };
}
export const orders = [
  createData("Admin", 100, 2.45, "USD", "SELL", 500, 433, 400, {
    lat: -3.745,
    lng: -38.523,
  }),
  createData("vasya", 50, 2.46, "EUR", "BUY", 300, 733, 450, {
    lat: -3.76,
    lng: -38.514,
  }),
  createData("petya", 1000, 2.41, "NIS", "SELL", 600, 633, 490, {
    lat: -3.73,
    lng: -38.533,
  }),
  createData("nafanya5000", 500, 2.44, "BYN", "BUY", 1000, 5533, 5500, {
    lat: -3.751,
    lng: -38.543,
  }),
];

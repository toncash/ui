export enum OrderType {
  BUY,
  SELL,
}

export enum OrderStatus {
  CURRENT,
  PENDING,
  FINISH,
  BAD,
}

export type Order = {
  id: string
  buyerId: number
  sellerId: number
  localDateTime: Date
  amount: number
  location: Location
  price: number
  currency: string
  orderType: OrderType
  orderStatus: OrderStatus
}

type Location = {
  x: number
  y: number
}

type Limit = {
  min: number
  max: number
}

export function createOrder(
  address: string,
  buyerId: number,
  sellerId: number,
  localDateTime: Date,
  amount: number,
  location: Location,
  price: number,
  currency: string,
  orderType: OrderType,
  orderStatus: OrderStatus
) {
  return {
    id: address,
    buyerId,
    sellerId,
    localDateTime,
    amount,
    location,
    price,
    currency,
    orderType,
    orderStatus,
  }
}

export default Order

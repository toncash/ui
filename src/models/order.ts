import {Deal} from "./deal";

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
  id?: string
  ownerId: string | number
  amount: number
  location: Location
  price: number
  currency: string
  orderType: OrderType
  orderStatus: OrderStatus
  limit: Limit
  deals?: Deal [],
  localDateTime?: string
}

export type Location = {
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
  amount: number,
  location: Location,
  price: number,
  currency: string,
  orderType: OrderType,
  orderStatus: OrderStatus,
  limit: Limit
) {
  return {
    id: address,
    buyerId,
    sellerId,
    amount,
    location,
    price,
    currency,
    orderType,
    orderStatus,
    limit
  }
}

export function getEmptyOrder(location: Location) : Order {
  return {
    ownerId: 0,
    amount: 0,
    location,
    price: 0,
    currency: "$ USD",
    orderType: OrderType.SELL,
    orderStatus: OrderStatus.CURRENT,
    limit: {
      min: 0,
      max: 0
    }
  }
}

export default Order

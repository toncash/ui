import { atom } from "nanostores"
import Order, { getEmptyOrder } from "../models/order"

export const orderData = atom<Order>(getEmptyOrder({ x: 0, y: 0 }))

export function setOrderData(_order: Order) {
  orderData.set({ ..._order })
}

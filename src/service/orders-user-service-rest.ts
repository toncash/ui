import DataProvider from "./data-provider"
import Order, { OrderType } from "../models/order"
import { OrderUser } from "../models/order-user"

export default class OrdersUserServiceRest {
  constructor(private url: string, private wsUrl: string = "") {}

  async getByUser(userId: number): Promise<OrderUser[]> {
    return fetchGet(`${this.url}?personId=${userId}`)
  }

  async getByGeo(lat: number, lng: number): Promise<OrderUser[]> {
    const res = await fetchGet(`${this.url}/location?location=${lat},${lng}&distance=90.5`)

    return res
  }

  async getByOrderId(orderId: string | number): Promise<OrderUser> {
    return fetchGet(`${this.url}/${orderId}`)
  }
}

async function requestRest(url: string, init?: RequestInit): Promise<any> {
  const response: Response = await fetch(url, init)
  return await response.json()
}

function fetchGet(url: string): Promise<any> {
  return requestRest(url, {
    method: "GET",
  })
}

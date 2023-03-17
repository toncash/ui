import DataProvider from "./data-provider"
import Order, { OrderType } from "../models/order"

export default class OrdersServiceRest implements DataProvider<Order> {
  constructor(private url: string, private wsUrl: string = "") {}

  private getUrlId(id: number) {
    return `${this.url}/${id}`
  }

  async add(order: Order): Promise<Order> {
    const x = order.location.x
    order.location.x = order.location.y
    order.location.y = x
    const userId = order.ownerId
    return requestRest(`${this.url}?personId=${userId}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(order),
    })
  }

  async get(orderId: string): Promise<Order> {
    return fetchGet(`${this.url}/${orderId}`)
  }

  async getByUser(userId: number): Promise<Order[]> {
    return fetchGet(`${this.url}?personId=${userId}`)
  }

  async getByGeo(lat: number, lng: number): Promise<Order[]> {
    return fetchGet(`${this.url}/location?location=${lat},${lng}&distance=20.5`)
  }

  async remove(id: string): Promise<Order> {
    const oldOrder = await this.get(id)
    await requestRest(`${this.url}/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    })
    return oldOrder
  }
}

async function requestRest(url: string, init?: RequestInit): Promise<any> {
  const response: Response = await fetch(url, init)
  return await response.json()
}

function getHeaders(): { "Content-Type": string; Authorization?: string } {
  return { "Content-Type": "application/json" }
}

function fetchGet(url: string): Promise<any> {
  return requestRest(url, {
    method: "GET",
  })
}

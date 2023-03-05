import DataProvider from "./data-provider"
import Order from "../models/order"
import { generateId } from "../utils/generator"

export default class Orders {
  constructor(private ordersService: DataProvider<Order>) {}

  addOrder(order: Order): Promise<Order> {
    return this.ordersService.add(order)
  }

  removeOrder(id: string): Promise<Order> {
    return this.ordersService.remove(id)
  }

  getOrder(orderId: string): Promise<Order> {
    return this.ordersService.get(orderId)
  }

  getOrdersByUser(userId: number): Promise<Order[]> {
    return this.ordersService.getByUser(userId)
  }

  getOrdersByGeo(lat: number, lng: number): Promise<Order[]> {
    return this.ordersService.getByGeo(lat, lng)
  }
}

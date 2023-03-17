import DataProvider from "./data-provider"
import { OrderUser } from "../models/order-user"
import Order from "../models/order"

export default class OrderUsers {
  constructor(private ordersUserService: any) {}

  getOrderUsersByUser(userId: number | string): Promise<Order[]> {
    return this.ordersUserService.getByUser(userId)
  }

  getOrderUsersByGeo(x: number, y: number): Promise<OrderUser[]> {
    console.log("step1")
    return this.ordersUserService.getByGeo(x, y)
  }

  getOrderUser(orderId: string | number): Promise<OrderUser> {
    return this.ordersUserService.getByOrderId(orderId)
  }
}

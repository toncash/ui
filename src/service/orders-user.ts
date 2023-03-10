import DataProvider from "./data-provider"
import {OrderUser} from "../models/order-user";

export default class OrderUsers {
    constructor(private ordersUserService: any) {}

    getOrderUsersByUser(userId: number): Promise<OrderUser[]> {
        return this.ordersUserService.getByUser(userId)
    }

    getOrderUsersByGeo(x: number, y: number): Promise<OrderUser[]> {
        console.log("step1")
        return this.ordersUserService.getByGeo(x, y)
    }
}

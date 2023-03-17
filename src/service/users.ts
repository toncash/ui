import DataProvider from "./data-provider"
import Order from "../models/order"
import User from "../models/user";

export default class Users {
    constructor(private usersService: DataProvider<User>) {}

    addUser(order: User): Promise<User> {
        return this.usersService.add(order)
    }

    removeUser(id: string): Promise<User> {
        return this.usersService.remove(id)
    }

    getUser(orderId: string | number): Promise<User> {
        return this.usersService.get(orderId)
    }

    getUsersByUser(userId: number): Promise<User[]> {
        return this.usersService.getByUser(userId)
    }

    getUsersByGeo(lat: number, lng: number): Promise<User[]> {
        return this.usersService.getByGeo(lat, lng)
    }
}

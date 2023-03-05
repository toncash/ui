import OrdersServiceRest from "../service/orders-service-rest"
import Orders from "../service/orders"

const SERVER_URL = "https://toncash.herokuapp.com/api/v1"

const ordersProvider = new OrdersServiceRest(`${SERVER_URL}/orders`)
export const ordersService = new Orders(ordersProvider)

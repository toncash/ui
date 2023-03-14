import OrdersServiceRest from "../service/orders-service-rest"
import Orders from "../service/orders"
import UsersServiceRest from "../service/users-service-rest";
import Users from "../service/users";
import OrdersUserServiceRest from "../service/orders-user-service-rest";
import OrderUsers from "../service/orders-user";
import DealsServiceRest from "../service/deals-service-rest";
import Deals from "../service/deals";
import {useHistoryKeeper} from "../hooks/useHistoryKeeper";
import {useTonConnect} from "../hooks/useTonConnect";

const SERVER_URL = "https://toncash.herokuapp.com/api/v1"

const ordersProvider = new OrdersServiceRest(`${SERVER_URL}/orders`)
export const ordersService = new Orders(ordersProvider)

const usersProvider = new UsersServiceRest(`${SERVER_URL}/persons`)
export const usersService = new Users(usersProvider)

const ordersUserProvider = new OrdersUserServiceRest(`${SERVER_URL}/orders`)
export const ordersUserService = new OrderUsers(ordersUserProvider)



const dealsProvider = new DealsServiceRest(`${SERVER_URL}`)
export const dealsService = new Deals(dealsProvider)

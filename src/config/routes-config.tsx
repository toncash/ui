import {RouteType} from "../models/common/route-type";
import {Login} from "../components/pages/Login";
import {Profile} from "../components/pages/Profile";
import {Order} from "../components/pages/Order";

export const PATH_LOGIN = "/ui/login"
export const PATH_PROFILE = "/ui/profile"
export const PATH_ORDER = "/ui/order"

export const routes: RouteType[] = [
    {path: PATH_LOGIN, element: <Login/>, label: "Login"},
    {path: PATH_PROFILE, element: <Profile/>, label: "Profile"},
    {path: PATH_ORDER, element: <Order/>, label: "Order"}
]
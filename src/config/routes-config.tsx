import { RouteType } from "../models/common/route-type"
import { Login } from "../components/pages/Login"
import { Profile } from "../components/pages/Profile"
import { CreateOrder } from "../components/pages/CreateOrder"
import { FindOrder } from "../components/pages/FindOrder"
import FindOrders from "../components/pages/FindOrders"

export const PATH_LOGIN = "/ui/login"
export const PATH_PROFILE = "/ui/profile"
export const PATH_CREATEORDER = "/ui/create-order"
export const PATH_FINDORDER = "/ui/find-order"
export const PATH_FINDORDERS = "/ui/find-orders"

export const routes: RouteType[] = [
  { path: PATH_LOGIN, element: <Login />, label: "Login" },
  { path: PATH_PROFILE, element: <Profile />, label: "Profile" },
  { path: PATH_CREATEORDER, element: <CreateOrder />, label: "CreateOrder" },
  { path: PATH_FINDORDER, element: <FindOrder />, label: "FindOrder" },
  { path: PATH_FINDORDERS, element: <FindOrders />, label: "FindOrders" },
]

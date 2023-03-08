import { RouteType } from "../models/common/route-type"
import { Profile } from "../components/pages/profile/Profile"
import { CreateOrder } from "../components/pages/CreateOrder"
import FindOrders from "../components/pages/find-orders/FindOrders"

export const PATH_LOGIN = "/ui/login"
export const PATH_PROFILE = "/ui/profile"
export const PATH_CREATEORDER = "/ui/create-order"
export const PATH_FINDORDER = "/ui/find-order"
export const PATH_FINDORDERS = "/ui/find-orders"

export const routes: RouteType[] = [
  { path: PATH_PROFILE, element: <Profile />, label: "Profile" },
  { path: PATH_CREATEORDER, element: <CreateOrder />, label: "CreateOrder" },
  { path: PATH_FINDORDERS, element: <FindOrders />, label: "FindOrders" },
]

import { RouteType } from "../models/common/route-type"
import { Profile } from "../components/pages/profile/Profile"
import { CreateOrder } from "../components/pages/CreateOrder"
import FindOrders from "../components/pages/find-orders/FindOrders"
import History from "../components/pages/history/History"
import CurrentOrder from "../components/pages/currentOrder/CurrentOrder"
import Cancel from "../components/pages/cancel/Cancel"
import CheckoutDeal from "../components/pages/checkout-deal/CheckoutDeal";
import OrderConfirmation from "../components/pages/order/OrderConfirmation";

export const PATH_LOGIN = "/ui/login"
export const PATH_PROFILE = "/ui/profile"
export const PATH_CREATEORDER = "/ui/create-order"
export const PATH_FINDORDERS = "/ui/find-orders"
export const PATH_HISTORY = "/ui/history"
export const PATH_CURRENTORDER = "/ui/order/:id"
export const PATH_CANCEL = "/ui/cancel"
export const PATH_CHECKOUT = "/ui/checkout"
export const PATH_ORDER_CONFIRMATION = "/ui/confirmation"

export const BASE_PATH_CURRENTORDER = "/ui/order/"

export const routes: RouteType[] = [
  { path: PATH_PROFILE, element: <Profile />, label: "Profile" },
  { path: PATH_CREATEORDER, element: <CreateOrder />, label: "CreateOrder" },
  { path: PATH_FINDORDERS, element: <FindOrders />, label: "FindOrders" },
  { path: PATH_HISTORY, element: <History />, label: "History" },
  { path: PATH_CURRENTORDER, element: <CurrentOrder />, label: "CurrentOrder" },
  { path: PATH_CANCEL, element: <Cancel />, label: "Cancel" },
  { path: PATH_CHECKOUT, element: <CheckoutDeal />, label: "Checkout" },
  { path: PATH_ORDER_CONFIRMATION, element: <OrderConfirmation/>, label: "Confirmation" },
]

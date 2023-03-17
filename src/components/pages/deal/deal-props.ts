import { Deal } from "../../../models/deal"
import Order from "../../../models/order"
import User from "../../../models/user"

export type DealProps = {
  id?: string | number
  deal: Deal
  order: Order
  dealOwner: User
  orderOwner: User
}

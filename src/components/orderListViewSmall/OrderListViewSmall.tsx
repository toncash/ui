import { ImageAvatar } from "@twa-dev/mark42"
import { Link } from "react-router-dom"
import { BASE_PATH_CURRENTORDER } from "../../config/routes-config"
import classes from "./OrderListViewSmall.module.css"
import React from "react"
import { Deal } from "../../models/deal"
import { usersService } from "../../config/service-config"
import Order, { OrderType } from "../../models/order"

export const OrderListViewSmall = ({ order }: { order: Order }) => {
  const link = BASE_PATH_CURRENTORDER + order.id

  return (
    <Link className={classes.orderItem} to={link}>
      <div className={classes.userContainer}>
        <ImageAvatar src={"../my_order.png"} size={36} />
        <div>
          <p className={classes.userName}>{"my order"}</p>
          <p className={classes.orderData}>{order.localDateTime?.substring(0, 10)}</p>
        </div>
      </div>
      <div className={classes.info}>
        <p className={classes.infoValueTon}>{order.amount} TON</p>

        <p className={classes.statusComleted}>{order.orderStatus}</p>
      </div>
    </Link>
  )
}

export default OrderListViewSmall

import { ImageAvatar } from "@twa-dev/mark42"
import { Avatar } from "@twa-dev/mark42/dist/Components/Avatar"
import React from "react"
import { Card, TextCommon } from "../styled/styled"
import { UserName } from "../pages/profile/Profile"
import Order from "../../models/order"
import classes from "./OrderListView.module.css"

const OrderListView = ({ order }: { order: Order }) => {
  // {order.orderType}

  return (
    <div className={classes.itemOrdersList}>
      <div className={classes.userContainer}>
        <ImageAvatar src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png" size={36} />
        <div>
          <p className={classes.userName}>@{order.buyerId}</p>
          <p className={classes.userDistance}>500m away</p>
        </div>
      </div>
      <div className={classes.infoContainer}>
        <div>
          <p className={classes.infoContainerTitle}>Amount:</p>
          <p className={classes.infoContainerValue}>{order.amount} TON</p>
        </div>
        <span className={classes.designerPartition} />
        <div>
          <p className={classes.infoContainerTitle}>Price:</p>
          <p className={classes.infoContainerValue}>
            {order.price} {order.currency}
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderListView

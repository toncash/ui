import { ImageAvatar } from "@twa-dev/mark42"
import { Avatar } from "@twa-dev/mark42/dist/Components/Avatar"
import React, {useEffect, useState} from "react"
import { Card, TextCommon } from "../styled/styled"
import { UserName } from "../pages/profile/Profile"
import Order from "../../models/order"
import classes from "./OrderListView.module.css"
import {OrderUser} from "../../models/order-user";
import getAvatar from "../../utils/getAvatar";

const OrderListView = ({ orderUser }: { orderUser: OrderUser }) => {

  const [avatarUrl, setAvatarUrl] = useState("")
  useEffect(()=>{
    getAvatar(Number(orderUser.person.id))
        .then(res=>setAvatarUrl(res))
  }, [])
  return (
    <div className={classes.itemOrdersList}>
      <div className={classes.userContainer}>
        <ImageAvatar src={avatarUrl} size={36} />
        <div>
          <p className={classes.userName}>@{orderUser.person?.username}</p>
          <p className={classes.userDistance}>500m away</p>
        </div>
      </div>
      <div className={classes.infoContainer}>
        <div>
          <p className={classes.infoContainerTitle}>Amount:</p>
          <p className={classes.infoContainerValue}>{orderUser.order.amount} TON</p>
        </div>
        <span className={classes.designerPartition} />
        <div>
          <p className={classes.infoContainerTitle}>Price:</p>
          <p className={classes.infoContainerValue}>
            {orderUser.order.price} {orderUser.order.currency}
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderListView

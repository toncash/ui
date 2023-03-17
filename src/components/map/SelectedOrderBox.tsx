import { motion } from "framer-motion"
import { OverlayView } from "@react-google-maps/api"
import classes from "./Map.module.css"
import {Link} from "react-router-dom";
import {PATH_CHECKOUT} from "../../config/routes-config";
import {OrderUser} from "../../models/order-user";
import {useEffect, useState} from "react";
import getAvatar from "../../utils/getAvatar";
import {Button} from "../styled/styled";

interface CustomMarkerProps {
  orderUser?: OrderUser
}

const getPixelPositionOffset = (width: number, height: number) => ({
  x: -(width / 2),
  y: -(height / 2),
})

export function SelectedOrderBox({ orderUser }: CustomMarkerProps) {
  if (!orderUser) return null
  const [avatarUrl, setAvatarUrl] = useState("")
  useEffect(()=>{
    getAvatar(Number(orderUser.person.chatId))
        .then(res=>setAvatarUrl(res))
  }, [])
  console.log("orderUser")
  console.log(orderUser)
  return (
    <OverlayView
      position={{
        lat: orderUser.order.location.x,
        lng: orderUser.order.location.y,
      }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <motion.div
        className={classes.selectedOrderBox}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          duration: 0.25,
        }}
      >
        <div className={classes.userCard}>
          <img
            src={avatarUrl}
            className={classes.userAvatar}
          />
          <div className={classes.userCardRight}>
            <div className={classes.userSlug}>@{orderUser.person.username}</div>
            <div className={classes.userInfo}>
              2 km away, сompletion: <span className={classes.userSuccessPercent}>97%</span>
            </div>
          </div>
        </div>
        <div className={classes.orderInfo}>
          <div className={classes.orderDL}>
            <div className={classes.orderDT}>Amount:</div>
            <div className={classes.orderDD}>{orderUser.order.amount} TON</div>
          </div>
          <div className={classes.orderInfoDivider}></div>
          <div className={classes.orderDL}>
            <div className={classes.orderDT}>Price:</div>
            <div className={classes.orderDD}>
              {orderUser.order.price} {orderUser.order.currency}
            </div>
          </div>
        </div>
        <Link to={PATH_CHECKOUT} state={{order: orderUser.order, person: orderUser.person}}>Buy TON</Link>
      </motion.div>
    </OverlayView>
  )
}

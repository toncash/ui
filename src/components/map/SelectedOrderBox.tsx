import { motion } from "framer-motion"
import { OverlayView } from "@react-google-maps/api"
import Order from "../../models/order"
import classes from "./Map.module.css"

interface CustomMarkerProps {
  order?: Order
}

const getPixelPositionOffset = (width: number, height: number) => ({
  x: -(width / 2),
  y: -(height / 2),
})

export function SelectedOrderBox({ order }: CustomMarkerProps) {
  if (!order) return null

  return (
    <OverlayView
      position={{
        lat: order.location.x,
        lng: order.location.y,
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
            src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png"
            className={classes.userAvatar}
          />
          <div className={classes.userCardRight}>
            <div className={classes.userSlug}>@katya_ulyanova</div>
            <div className={classes.userInfo}>
              2 km away, сompletion: <span className={classes.userSuccessPercent}>97%</span>
            </div>
          </div>
        </div>
        <div className={classes.orderInfo}>
          <div className={classes.orderDL}>
            <div className={classes.orderDT}>Amount:</div>
            <div className={classes.orderDD}>{order.amount} TON</div>
          </div>
          <div className={classes.orderInfoDivider}></div>
          <div className={classes.orderDL}>
            <div className={classes.orderDT}>Price:</div>
            <div className={classes.orderDD}>
              {order.price} {order.currency}
            </div>
          </div>
        </div>
        <button>Buy TON</button>
      </motion.div>
    </OverlayView>
  )
}

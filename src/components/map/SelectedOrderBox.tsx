import { motion } from "framer-motion"
import { OverlayView } from "@react-google-maps/api"
import Order from "../../models/order"

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
        className="selected-order-box"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          duration: 0.25,
        }}
      >
        {order.id}
      </motion.div>
    </OverlayView>
  )
}

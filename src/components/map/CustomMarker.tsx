import { useCallback } from "react"
import { OverlayView } from "@react-google-maps/api"
import classes from "./Map.module.css"

interface CustomMarkerProps {
  orderId: string
  onClick: (orderId: string) => void
  text: string
  lat: number
  lng: number
}

const getPixelPositionOffset = (width: number, height: number) => ({
  x: -(width / 2),
  y: -(height / 2),
})

export default function CustomMarker({ orderId, text, lat, lng, onClick }: CustomMarkerProps) {
  const handleClick = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    e => {
        console.log(e)
      e.stopPropagation()
      e.preventDefault()
      onClick(orderId)
    },
    [onClick, orderId]
  )

  return (
    <OverlayView
      position={{
        lat,
        lng,
      }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      // getPixelPositionOffset={getPixelPositionOffset}
    >
      <div className={classes.priceTag} onClick={handleClick}>
        {text}
      </div>
    </OverlayView>
  )
}

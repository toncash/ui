import { GoogleMap, Marker } from "@react-google-maps/api"
import { useEffect, useRef, useState } from "react"
import Order from "../../models/order"
import { options } from "./optionMap"

const containerStyle = {
  height: "234px",
}

export function MapView(props: { order: Order; startLocation: any }) {
  const refMap = useRef<GoogleMap>(null)
  const { order, startLocation } = props

  let [centerLocation, setCenterLocation] = useState({
    lat: startLocation.x,
    lng: startLocation.y,
  })

  useEffect(() => {
    setCenterLocation({
      lat: order.location.x,
      lng: order.location.y,
    })
  }, [order])

  return order.amount ? (
    <GoogleMap mapContainerStyle={containerStyle} center={centerLocation} zoom={10} options={options}>
      <Marker position={{ lat: order.location.x, lng: order.location.y }} />
    </GoogleMap>
  ) : (
    <div>loading</div>
  )
}

import React, { useEffect, useMemo, useRef, useState } from "react"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import CustomMarker from "./CustomMarker"
import { SelectedOrderBox } from "./SelectedOrderBox"
import { OrderUser } from "../../models/order-user"
import { useStore } from "@nanostores/react"
import { locationData } from "../../store/Location"
import { options } from "./optionMap"

const containerStyle = {
  display: "flex",
  flex: 1,
}
const libraries = ["geometry"] as ["geometry"]

export function MapComponent(props: { ordersUsers: OrderUser[] }) {
  const [selectedOrder, selectOrder] = useState<string>()

  let { ordersUsers } = props

  const location = useStore(locationData)
  const centerLocation = useMemo(
    () => ({
      lat: location.x,
      lng: location.y,
    }),
    []
  )
  const onZoomChanged = () => {
    // console.log("onZoomChanged")
  }
  const handleDragStarted = () => {
    // console.log("handleDragStarted") //
  }
  const handleDragEnded = () => {
    // console.log("handleDragEnded") //
  }
  const onBoundsChanged = () => {
    // console.log("onBoundsChanged") //
  }
  const onLoad = () => {
    // console.log("onLoad")
  }

  console.log(ordersUsers)
  return ordersUsers ? (
    <GoogleMap
      onZoomChanged={onZoomChanged}
      onDragStart={handleDragStarted}
      onDragEnd={handleDragEnded}
      onLoad={onLoad}
      onBoundsChanged={onBoundsChanged}
      mapContainerStyle={containerStyle}
      center={centerLocation}
      zoom={15}
      onClick={() => {
        selectOrder(undefined)
      }}
      options={options}
    >
      {ordersUsers.map((orderUser, i) =>
        orderUser.order.id !== selectedOrder ? (
          <CustomMarker
            key={i}
            lat={orderUser.order.location.x}
            lng={orderUser.order.location.y}
            text={`${orderUser.order.amount} TON`}
            onClick={selectOrder}
            orderId={orderUser.order.id as string}
          />
        ) : (
          <SelectedOrderBox
            key={i}
            orderUser={ordersUsers.find(o => o.order.id === selectedOrder)}
            userLocation={{ lat: location.x, lng: location.y }}
          />
        )
      )}
    </GoogleMap>
  ) : (
    <div>loading</div>
  )
}

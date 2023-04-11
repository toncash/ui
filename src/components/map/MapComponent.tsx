import {useRef, useState} from "react"
import { GoogleMap, LoadScript } from "@react-google-maps/api"
import CustomMarker from "./CustomMarker"
import { SelectedOrderBox } from "./SelectedOrderBox"
import { OrderUser } from "../../models/order-user"
import { useStore } from "@nanostores/react"
import { locationData } from "../../store/Location"

const containerStyle = {
  display: "flex",
  flex: 1,
}
const libraries = ["geometry"] as ["geometry"]

export function MapComponent(props: { ordersUsers: OrderUser[] }) {
  const [selectedOrder, selectOrder] = useState<string>()
    const refMap = useRef<GoogleMap>(null)
  let { ordersUsers } = props
  const location = useStore(locationData)
    refMap.current?.state.map?.setCenter({

    })
  let centerLocation = refMap.current?.state.map?.getCenter() ? refMap.current?.state.map?.getCenter() :
      {
        lat: location.x,
        lng: location.y,
      }

  return (
    <GoogleMap
        ref={refMap}
      mapContainerStyle={containerStyle}
      center={
          centerLocation
      }
      zoom={10}
      onClick={() => {
        selectOrder(undefined)
        console.log(selectedOrder)
      }}
      options={{
        disableDefaultUI: true,
        clickableIcons: false,
      }}
    >
      {ordersUsers.map((orderUser, i) => (
        <CustomMarker
          key={i}
          lat={orderUser.order.location.x}
          lng={orderUser.order.location.y}
          text={`${orderUser.order.amount} TON`}
          onClick={selectOrder}
          orderId={orderUser.order.id as string}
        />
      ))}
      {selectedOrder && (
        <SelectedOrderBox
          orderUser={ordersUsers.find(o => o.order.id === selectedOrder)}
          userLocation={{ lat: location.x, lng: location.y }}
        />
      )}
    </GoogleMap>
  )
}

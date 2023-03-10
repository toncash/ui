import { useState } from "react"
import { GoogleMap, LoadScript } from "@react-google-maps/api"
import CustomMarker from "./CustomMarker"
import { SelectedOrderBox } from "./SelectedOrderBox"
import {OrderUser} from "../../models/order-user";
import {useStore} from "@nanostores/react";
import {locationData} from "../../store/Location";

const containerStyle = {
  display: "flex",
  flex: 1,
}

export function MapComponent(props: { ordersUsers: OrderUser[] }) {
  const [selectedOrder, selectOrder] = useState<string>()
  let { ordersUsers } = props
    const location = useStore(locationData)
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_MAP_API}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: location.x,
          lng: location.y,
        }}
        zoom={10}
        onClick={() => selectOrder(undefined)}
        options={{
          disableDefaultUI: true,
          clickableIcons: false,
        }}
      >
        {ordersUsers.map((orderUser, i) => (
          <CustomMarker
            key={i}
            lat={location.x}
            lng={location.y}
            text={`${orderUser.order.amount} TON`}
            onClick={selectOrder}
            orderId={orderUser.order.id as string}
          />
        ))}
        {selectedOrder && <SelectedOrderBox orderUser={ordersUsers.find(o => o.order.id === selectedOrder)} />}
      </GoogleMap>
    </LoadScript>
  )
}

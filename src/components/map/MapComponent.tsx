import { useState } from "react"
import { GoogleMap, LoadScript } from "@react-google-maps/api"
import Order from "../../models/order"
import CustomMarker from "./CustomMarker"
import { SelectedOrderBox } from "./SelectedOrderBox"

const containerStyle = {
  display: "flex",
  flex: 1,
}

export function MapComponent(props: { orders: Order[] }) {
  const [selectedOrder, selectOrder] = useState<string>()
  let { orders } = props

  return (
    <LoadScript googleMapsApiKey="AIzaSyCGvLoWBYgZhpX4GHbQf9q1tsrp6tPhbr4">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: 51.6110042,
          lng: -0.1021341,
        }}
        zoom={10}
        onClick={() => selectOrder(undefined)}
        options={{
          disableDefaultUI: true,
          clickableIcons: false,
        }}
      >
        {orders.map((order, i) => (
          <CustomMarker
            key={i}
            lat={order.location.x}
            lng={order.location.y}
            text="$100"
            onClick={selectOrder}
            orderId={order.id}
          />
        ))}
        {selectedOrder && <SelectedOrderBox order={orders.find(o => o.id === selectedOrder)} />}
      </GoogleMap>
    </LoadScript>
  )
}

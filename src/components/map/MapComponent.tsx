import {useEffect, useRef, useState} from "react"
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

    let ordersUsers = useRef<OrderUser []>([...props.ordersUsers])
  const location = useStore(locationData)
    const mapCenter = refMap.current?.state.map?.getCenter()
  let [centerLocation, setCenterLocation] = useState(
      {
          lat: location.x,
          lng: location.y
      }
  )

    console.log(ordersUsers.current)
  return ordersUsers.current?(
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
        {/*<CustomMarker*/}
        {/*    */}
        {/*    lat={34.644934096093735}*/}
        {/*    lng={31.202137805176825}*/}
        {/*    text={"123 TON"}*/}
        {/*    */}
        {/*>*/}

        {/*</CustomMarker>*/}
      {ordersUsers.current.map((orderUser, i) => (
          orderUser.order.id!==selectedOrder?
        <CustomMarker
          key={i}
          lat={orderUser.order.location.x}
          lng={orderUser.order.location.y}
          text={`${orderUser.order.amount} TON`}
          onClick={selectOrder}
          orderId={orderUser.order.id as string}
        /> :
              <SelectedOrderBox
                  orderUser={ordersUsers.current.find(o => o.order.id === selectedOrder)}
                  userLocation={{ lat: location.x, lng: location.y }}
              />
      ))}
      {/*{selectedOrder && (*/}
      {/*  <SelectedOrderBox*/}
      {/*    orderUser={ordersUsers.find(o => o.order.id === selectedOrder)}*/}
      {/*    userLocation={{ lat: location.x, lng: location.y }}*/}
      {/*  />*/}
      {/*)}*/}
    </GoogleMap>
  ): (<div>loading</div>)
}

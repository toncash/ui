import { GoogleMap, Marker } from "@react-google-maps/api"
import {useEffect, useRef, useState} from "react";
import Order from "../../models/order";

const containerStyle = {
  height: "234px",
}

export function MapView(props: { order: Order }) {
    const refMap = useRef<GoogleMap>(null)
    const {order} = props
    console.log(refMap.current?.state.map?.getCenter())
    console.log(order)
    let [centerLocation, setCenterLocation] = useState({
        lat: order.location.x,
        lng: order.location.y
    })

    useEffect(()=>{
        console.log("kuku")
        console.log(order)
        setCenterLocation(
            {
                lat: order.location.x,
                lng: order.location.y
            }
        )
    }, [order])
  return (
      order.amount ?
    <GoogleMap
        ref={refMap}
      mapContainerStyle={containerStyle}
        center={
            centerLocation
        }
      zoom={10}
      options={{
        disableDefaultUI: true,
        clickableIcons: false,
      }}
    >
      <Marker position={{ lat: order.location.x, lng: order.location.y }} />
    </GoogleMap>
          : <div>loading</div>
  )
}

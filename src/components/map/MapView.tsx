import { GoogleMap, Marker } from "@react-google-maps/api"
import {useRef} from "react";

const containerStyle = {
  height: "234px",
}

export function MapView(order: any) {
    const refMap = useRef<GoogleMap>(null)
    console.log(refMap.current?.state.map?.getCenter())
    let centerLocation = refMap.current?.state.map?.getCenter() ? refMap.current?.state.map?.getCenter() :
        {
            lat: order.x,
            lng: order.y,
        }
  return (
    <GoogleMap
        ref={refMap}
      mapContainerStyle={containerStyle}
      center={centerLocation}
      zoom={10}
      options={{
        disableDefaultUI: true,
        clickableIcons: false,
      }}
    >
      <Marker position={{ lat: order.x, lng: order.y }} />
    </GoogleMap>
  )
}

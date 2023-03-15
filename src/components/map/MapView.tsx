import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

const containerStyle = {
  height: "234px",
}

export function MapView(order: any) {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_MAP_API}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: order.x,
          lng: order.y,
        }}
        zoom={10}
        options={{
          disableDefaultUI: true,
          clickableIcons: false,
        }}
      >
        <Marker position={{ lat: order.x, lng: order.y }} />
      </GoogleMap>
    </LoadScript>
  )
}

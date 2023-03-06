import React, { Component, useState, useEffect } from "react"
import { GoogleMap, LoadScript, InfoBox, MarkerF, InfoWindow } from "@react-google-maps/api"
import Order from "../../models/order"

const containerStyle = {
  width: "100%",
  height: "300px",
}

const markers = [
  {
    lat: -3.745,
    lng: -38.523,
  },
  {
    lat: -3.76,
    lng: -38.514,
  },
  {
    lat: -3.73,
    lng: -38.533,
  },
]

const options = { closeBoxURL: "", enableEventPropagation: true }

const onLoad = (infoBox: any) => {
  console.log("infoBox: ", infoBox)
}

export function MapComponent(props: { orders: Order[] }) {
  const [selectedMarker, setSelectedMarker] = useState(null)
  const { orders } = props

  function selectMarker(coordinates: any) {
    setSelectedMarker(coordinates)
  }

  return (
    <LoadScript googleMapsApiKey="AIzaSyCGvLoWBYgZhpX4GHbQf9q1tsrp6tPhbr4">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: 51.6110042,
          lng: -0.1021341,
        }}
        zoom={10}
        onClick={() => setSelectedMarker(null)}
      >
        {orders.map(order => (
          <MarkerF
            position={{
              lat: order.location.x,
              lng: order.location.y,
            }}
            onClick={() => selectMarker(order.location)}
          ></MarkerF>
        ))}
        {/*<MarkerF*/}
        {/*    position={markers[0]}*/}
        {/*    onClick={() => selectMarker(markers[0])} >*/}
        {/*</MarkerF>*/}
        {/*<MarkerF*/}
        {/*    position={markers[1]}*/}
        {/*    onClick={() => selectMarker(markers[1])} >*/}
        {/*</MarkerF>*/}
        {/*<MarkerF*/}
        {/*    position={markers[2]}*/}
        {/*    onClick={() => selectMarker(markers[2])} >*/}
        {/*</MarkerF>*/}
        {selectedMarker && (
          <InfoBox onLoad={onLoad} options={options} position={selectedMarker}>
            <div style={{ backgroundColor: "white", opacity: 0.95, padding: 12 }}>
              <div style={{ fontSize: 16 }}>Hello, World!</div>
            </div>
          </InfoBox>
        )}
      </GoogleMap>
    </LoadScript>
  )
}

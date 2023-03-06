import { useRef } from "react"
import { GoogleMap, LoadScript } from "@react-google-maps/api"
import { GoogleMapRedMarker } from "../styled/styled"
import { ButtonOrder, FlexBoxRow1 } from "../pages/profile/Profile"

const containerStyle = {
  width: "100%",
  height: "300px",
}

type LocationProps = {
  location: {
    lat: number
    lng: number
  }
}

export function OrderMapComponent(props: LocationProps) {
  const { location } = props

  const refMap = useRef<GoogleMap>(null)

  const handleConfirm = () => {
    const mapCenter = refMap.current?.state.map?.getCenter()
    if (!mapCenter) throw Error("Missing map center")

    console.log(mapCenter.lng())
    console.log(mapCenter.lat())
  }

  return (
    <div>
      <LoadScript googleMapsApiKey={"AIzaSyCGvLoWBYgZhpX4GHbQf9q1tsrp6tPhbr4"}>
        <GoogleMap ref={refMap} mapContainerStyle={containerStyle} zoom={10} center={location}>
          <GoogleMapRedMarker />
        </GoogleMap>
      </LoadScript>
      <FlexBoxRow1>
        <ButtonOrder
          onClick={() => {
            console.log("sell")
          }}
        >
          Cancel
        </ButtonOrder>
        <ButtonOrder onClick={handleConfirm}>Confirm</ButtonOrder>
      </FlexBoxRow1>
    </div>
  )
}

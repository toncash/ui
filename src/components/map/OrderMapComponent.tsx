import { useRef } from "react"
import { GoogleMap, LoadScript } from "@react-google-maps/api"
import { GoogleMapRedMarker } from "../styled/styled"
import { ButtonOrder, FlexBoxRow1 } from "../pages/profile/Profile"
import Order from "../../models/order";
import {OrderUser} from "../../models/order-user";
import {useStore} from "@nanostores/react";
import {locationData} from "../../store/Location";

const containerStyle = {
  width: "100%",
  height: "300px",
}

type Location = {
  lat: number
  lng: number
}

type LocationProps = {
  setStep: (step: number)=>void,
  orderUser: OrderUser,
  setOrderUser: (o: OrderUser)=>void
}

export function OrderMapComponent(props: LocationProps) {
  const { orderUser, setOrderUser, setStep } = props

  const refMap = useRef<GoogleMap>(null)
  const location = useStore(locationData)
  console.log("location - ", location)
  const handleConfirm = () => {
    const mapCenter = refMap.current?.state.map?.getCenter()
    if (!mapCenter) throw Error("Missing map center")
    orderUser.order.location.x = mapCenter.lat()
    orderUser.order.location.y = mapCenter.lng()

    setOrderUser({...orderUser})
  }

  return (
    <div>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_MAP_API}>
        <GoogleMap ref={refMap} mapContainerStyle={containerStyle} zoom={10} center={{lat: location.x, lng: location.y}}>
          <GoogleMapRedMarker />
        </GoogleMap>
      </LoadScript>
      <FlexBoxRow1>
        <ButtonOrder
          onClick={() => {
            setStep(1)
          }}
        >
          Cancel
        </ButtonOrder>
        <ButtonOrder onClick={()=>{
          handleConfirm()
          setStep(1)
        }}>Confirm</ButtonOrder>
      </FlexBoxRow1>
    </div>
  )
}

import { useRef } from "react"
import { GoogleMap, LoadScript } from "@react-google-maps/api"
import { GoogleMapRedMarker } from "../styled/styled"
import { OrderUser } from "../../models/order-user"
import { useStore } from "@nanostores/react"
import { locationData } from "../../store/Location"
import classes from "./style.module.css"
import { options } from "./optionMap"

const containerStyle = {
  width: "100%",
  height: "300px",
}

type LocationProps = {
  setStep: (step: number) => void
  orderUser: OrderUser
  setOrderUser: (o: OrderUser) => void
}

export function OrderMapComponent(props: LocationProps) {
  const { orderUser, setOrderUser, setStep } = props

  const refMap = useRef<GoogleMap>(null)
  const location = useStore(locationData)
  let centerLocation = {
    lat: location.x,
    lng: location.y,
  }

  const handleConfirm = () => {
    const mapCenter = refMap.current?.state.map?.getCenter()
    if (!mapCenter) throw Error("Missing map center")
    orderUser.order.location.x = mapCenter.lat()
    orderUser.order.location.y = mapCenter.lng()

    setOrderUser({ ...orderUser })
  }

  return (
    <div style={{ margin: "50px 0" }}>
      <GoogleMap
        ref={refMap}
        mapContainerStyle={containerStyle}
        zoom={10}
        center={!refMap.current?.state.map?.getCenter() ? centerLocation : refMap.current?.state.map?.getCenter()}
        options={options}
      >
        <GoogleMapRedMarker />
      </GoogleMap>

      <div className={classes.buttonContainer}>
        <button
          className={classes.buttonValueCancel}
          onClick={() => {
            setStep(1)
          }}
        >
          Cancel
        </button>
        <button
          className={classes.buttonValueCame}
          onClick={() => {
            handleConfirm()
            setStep(1)
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  )
}

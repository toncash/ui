import React, {useState, useRef, Dispatch, SetStateAction} from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import {Button} from "../styled/styled";
import {ButtonOrder, FlexBoxRow1} from "../pages/Profile";

const containerStyle = {
    width: '100%',
    height: '300px'
};

type LocationProps = {
    location: {
        lat: number,
        lng: number
    }
}

export function OrderMapComponent(props: LocationProps) {
    const {location} = props
    const [markerPosition, setMarkerPosition] = useState(location)

    const refMap = useRef(null);


    const updateCenter = () => {
        const mapCenter = refMap.current.state.map.center
        setMarkerPosition(mapCenter)
    }

    const handleConfirm = ()=>{
        console.log(markerPosition.lng())
        console.log(markerPosition.lat())
    }

    return (
        <div>
        <LoadScript
            googleMapsApiKey={"AIzaSyCGvLoWBYgZhpX4GHbQf9q1tsrp6tPhbr4"}
        >
            <GoogleMap
                ref={refMap}
                mapContainerStyle={containerStyle}
                zoom={10}
                onBoundsChanged={updateCenter}
                center={location}
            >
                <MarkerF
                    position={markerPosition} >
                </MarkerF>
            </GoogleMap>
        </LoadScript >
            <FlexBoxRow1>
                <ButtonOrder onClick={() => { console.log('sell') }}>Cancel</ButtonOrder>
                <ButtonOrder onClick={handleConfirm}>Confirm</ButtonOrder>
            </FlexBoxRow1>
        </div>
    )
}
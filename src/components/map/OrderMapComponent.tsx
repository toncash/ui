import React, {useState, useRef, Dispatch, SetStateAction} from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '300px'
};

type LocationProps = {
    location: {
        lat: number,
        lng: number
    },
    setLocation: Dispatch<SetStateAction<{ lat: number; lng: number; }>>
}

export function OrderMapComponent(props: LocationProps) {
    const {location, setLocation} = props
    const refMap = useRef(null);


    const updateCenter = () => {
        const mapCenter = refMap.current.state.map.center
        setLocation(mapCenter)
        console.log(refMap)
        console.log(mapCenter.lat())
        console.log(mapCenter.lng())
    }
    // console.log(process.env.MAP_API)
    return (
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
                    position={location} >
                </MarkerF>
            </GoogleMap>
        </LoadScript >
    )
}
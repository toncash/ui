import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '300px'
};

export function OrderMapComponent({location, onLocationChange}) {
    
    const refMap = useRef(null);
    const [markerPosition, setMarkerPosition] = useState(location)

    const updateCenter = () => {
        const mapCenter = refMap.current.state.map.center
        setMarkerPosition(mapCenter)
        onLocationChange(mapCenter)
    }

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyCGvLoWBYgZhpX4GHbQf9q1tsrp6tPhbr4"
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
    )
}
import React, { Component, useState, useEffect } from 'react';
import { GoogleMap, LoadScript, InfoBox, MarkerF, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const markers = [{
    lat: -3.745,
    lng: -38.523
},
{
    lat: -3.760,
    lng: -38.514
}, {
    lat: -3.730,
    lng: -38.533
}
];

const mapContainerStyle = {
    height: "400px",
    width: "800px"
};

const options = { closeBoxURL: '', enableEventPropagation: true };

const onLoad = (infoBox: any) => {
    console.log('infoBox: ', infoBox)
};

export function MapComponent() {
    const [selectedMarker, setSelectedMarker] = useState(null);

    function selectMarker(coordinates: any) {
        setSelectedMarker(coordinates);
    }

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyCGvLoWBYgZhpX4GHbQf9q1tsrp6tPhbr4"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={markers[0]}
                zoom={10}
                onClick={() => setSelectedMarker(null)}
            >
                <MarkerF
                    position={markers[0]}
                    onClick={() => selectMarker(markers[0])} >
                </MarkerF>
                <MarkerF
                    position={markers[1]}
                    onClick={() => selectMarker(markers[1])} >
                </MarkerF>
                <MarkerF
                    position={markers[2]}
                    onClick={() => selectMarker(markers[2])} >
                </MarkerF>
                {selectedMarker && <InfoBox
                    onLoad={onLoad}
                    options={options}
                    position={selectedMarker}
                >
                    <div style={{ backgroundColor: 'white', opacity: 0.95, padding: 12 }}>
                        <div style={{ fontSize: 16 }}>
                            Hello, World!
                        </div>
                    </div>
                </InfoBox>}
            </GoogleMap>
        </LoadScript >
    )
}
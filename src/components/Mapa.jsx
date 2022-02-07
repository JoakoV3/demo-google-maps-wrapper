import React, { useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import MapComponent from './MapComponent';
import ErrorComponent from './ErrorComponent';
import Marker from './Marker';

const Spinner = () => {
    return <div>Carganding</div>;
};

export default function Mapa() {
    const center = { lat: -34.397, lng: 150.644 };
    const zoom = 10;

    const [markerPosition, setMarkerPosition] = useState(center);

    const render = status => {
        switch (status) {
            case Status.LOADING:
                return <Spinner />;
            case Status.FAILURE:
                return <ErrorComponent />;
            case Status.SUCCESS:
                return <MapComponent />;
            default:
                return null;
        }
    };

    const onClick = e => {
        setMarkerPosition(e.latLng);
    };

    return (
        <>
            <h2>Mapa</h2>

            <Wrapper apiKey={'AIzaSyBQQlEEl7OeuMLuUxjzgTnNHJpgSroZeLE'} render={render}>
                <MapComponent onClick={onClick} center={center} zoom={zoom}>
                    <Marker position={{ lat: -34.317, lng: 150.614 }} text="6741" />
                    <Marker position={markerPosition} iconType="stroke" text="15" />
                </MapComponent>
            </Wrapper>
        </>
    );
}

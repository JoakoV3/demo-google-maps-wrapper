import React, { useEffect, useRef } from 'react';

export default function MapComponent({ center, zoom, children, onClick, onIdle }) {
    const ref = useRef();
    const [map, setMap] = React.useState();

    useEffect(() => {
        if (ref.current && !map) {
            setMap(
                new window.google.maps.Map(ref.current, {
                    center,
                    zoom,
                    mapTypeId: window.google.maps.MapTypeId.ROADMAP,
                    styles: CustomMapStyles,
                })
            );
        }
    }, [ref, map]);

    useEffect(() => {
        if (map) {
            ['click', 'idle'].forEach(eventName => window.google.maps.event.clearListeners(map, eventName));

            if (onClick) {
                map.addListener('click', onClick);
            }

            if (onIdle) {
                map.addListener('idle', () => onIdle(map));
            }
        }
    }, [map, onClick, onIdle]);

    return (
        <div ref={ref} id="map" style={{ width: '100%', height: '500px' }}>
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { map });
                }
            })}
        </div>
    );
}

const CustomMapStyles = [
    {
        'featureType': 'all',
        'elementType': 'labels.text.fill',
        'stylers': [
            {
                'saturation': 36,
            },
            {
                'color': '#000000',
            },
            {
                'lightness': 40,
            },
        ],
    },
    {
        'featureType': 'all',
        'elementType': 'labels.text.stroke',
        'stylers': [
            {
                'visibility': 'on',
            },
            {
                'color': '#000000',
            },
            {
                'lightness': 16,
            },
        ],
    },
    {
        'featureType': 'all',
        'elementType': 'labels.icon',
        'stylers': [
            {
                'visibility': 'off',
            },
        ],
    },
    {
        'featureType': 'administrative',
        'elementType': 'geometry.fill',
        'stylers': [
            {
                'color': '#000000',
            },
            {
                'lightness': 20,
            },
        ],
    },
    {
        'featureType': 'administrative',
        'elementType': 'geometry.stroke',
        'stylers': [
            {
                'color': '#000000',
            },
            {
                'lightness': 17,
            },
            {
                'weight': 1.2,
            },
        ],
    },
    {
        'featureType': 'landscape',
        'elementType': 'geometry',
        'stylers': [
            {
                'color': '#000000',
            },
            {
                'lightness': 20,
            },
        ],
    },
    {
        'featureType': 'poi',
        'elementType': 'geometry',
        'stylers': [
            {
                'color': '#000000',
            },
            {
                'lightness': 21,
            },
        ],
    },
    {
        'featureType': 'road.highway',
        'elementType': 'geometry.fill',
        'stylers': [
            {
                'color': '#000000',
            },
            {
                'lightness': 17,
            },
        ],
    },
    {
        'featureType': 'road.highway',
        'elementType': 'geometry.stroke',
        'stylers': [
            {
                'color': '#000000',
            },
            {
                'lightness': 29,
            },
            {
                'weight': 0.2,
            },
        ],
    },
    {
        'featureType': 'road.arterial',
        'elementType': 'geometry',
        'stylers': [
            {
                'color': '#000000',
            },
            {
                'lightness': 18,
            },
        ],
    },
    {
        'featureType': 'road.local',
        'elementType': 'geometry',
        'stylers': [
            {
                'color': '#000000',
            },
            {
                'lightness': 16,
            },
        ],
    },
    {
        'featureType': 'transit',
        'elementType': 'geometry',
        'stylers': [
            {
                'color': '#000000',
            },
            {
                'lightness': 19,
            },
        ],
    },
    {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [
            {
                'color': '#0f2e19',
            },
            {
                'lightness': 17,
            },
        ],
    },
];

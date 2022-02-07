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
        // eslint-disable-next-line
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
        'featureType': 'landscape',
        'stylers': [
            {
                'hue': '#FFBB00',
            },
            {
                'saturation': 43.400000000000006,
            },
            {
                'lightness': 37.599999999999994,
            },
            {
                'gamma': 1,
            },
        ],
    },
    {
        'featureType': 'road.highway',
        'stylers': [
            {
                'hue': '#FFC200',
            },
            {
                'saturation': -61.8,
            },
            {
                'lightness': 45.599999999999994,
            },
            {
                'gamma': 1,
            },
        ],
    },
    {
        'featureType': 'road.arterial',
        'stylers': [
            {
                'hue': '#FF0300',
            },
            {
                'saturation': -100,
            },
            {
                'lightness': 51.19999999999999,
            },
            {
                'gamma': 1,
            },
        ],
    },
    {
        'featureType': 'road.local',
        'stylers': [
            {
                'hue': '#FF0300',
            },
            {
                'saturation': -100,
            },
            {
                'lightness': 52,
            },
            {
                'gamma': 1,
            },
        ],
    },
    {
        'featureType': 'water',
        'stylers': [
            {
                'hue': '#0078FF',
            },
            {
                'saturation': -13.200000000000003,
            },
            {
                'lightness': 2.4000000000000057,
            },
            {
                'gamma': 1,
            },
        ],
    },
    {
        'featureType': 'poi',
        'stylers': [
            {
                'hue': '#00FF6A',
            },
            {
                'saturation': -1.0989010989011234,
            },
            {
                'lightness': 11.200000000000017,
            },
            {
                'gamma': 1,
            },
        ],
    },
];

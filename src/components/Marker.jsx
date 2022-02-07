import { useState, useEffect } from 'react';

export default function Marker({ iconType = 'normal', map, position, text = '' }) {
    const [marker, setMarker] = useState();

    const icons = {
        normal: {
            textColor: 'white',
            icon: '<svg viewBox="0 0 40 40" width="40" height="40" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="#6a5df9"/></svg>',
        },
        stroke: {
            textColor: '#6a5df9',
            icon: '<svg viewBox="0 0 40 40" width="40" height="40" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle cx="19" cy="19" r="18" stroke="#6a5df9" stroke-width="1" fill="white"/></svg>',
        },
    };

    useEffect(() => {
        if (!marker) {
            setMarker(new window.google.maps.Marker());
        }

        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    useEffect(() => {
        if (marker) {
            const svgMarker = {
                url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(icons[iconType].icon),
                rotation: 0,
                scale: 1,
                anchor: new window.google.maps.Point(20, 20),
                labelOrigin: new window.google.maps.Point(iconType === 'normal' ? 20 : 18, 20),
            };

            marker.setOptions({
                map,
                position,
                icon: svgMarker,
                label: {
                    text,
                    color: icons[iconType].textColor,
                    fontSize: '14px',
                    fontWeight: '600',
                },
                animation: window.google.maps.Animation.DROP,
            });
        }
        // eslint-disable-next-line
    }, [marker, iconType, map, position, text]);

    return null;
}

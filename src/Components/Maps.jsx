import React, { useEffect, useRef } from 'react';
    import L from 'leaflet';
    import 'leaflet/dist/leaflet.css';
    const Maps = () => {
      const mapRef = useRef(null);

      useEffect(() => {
        if (mapRef.current && !mapRef.current._leaflet_id) {
          const map = L.map(mapRef.current, {
            center: [22.7196, 75.8577],
            zoom: 13,
            zoomControl: false,
          });

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
          }).addTo(map);

        

        map.on('click', function (e) {
      const { lat, lng } = e.latlng;
      console.log("Clicked Location:", lat, lng);
      alert(`Latitude: ${lat}, Longitude: ${lng}`);
    });

        }
      }, []);

      return (
        <div className="relative w-full h-full rounded-lg">
          <div
            ref={mapRef}
            className="w-full rounded-4xl h-full z-0"
            style={{ position: 'relative' }}
          ></div>
        </div>
      );
    };

    export default Maps;

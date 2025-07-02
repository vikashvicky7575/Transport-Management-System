import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './TripTrackingMap.module.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibXZpa2FzaDc1NzUiLCJhIjoiY21ic3B1c25pMDZwejJsc2lmZnRweDAwdyJ9.Qjh_NVaN-Z-HdAe0zk8gaw';

const TripTrackingMap = ({ pickup, drop, onClose }) => {
  const mapContainer = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const pickupCoords = pickup?.coordinates;
    const dropCoords = drop?.coordinates;

    if (!pickupCoords || !dropCoords) {
      console.error('Invalid pickup or drop coordinates.');
      return;
    }

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: pickupCoords,
      zoom: 6,
    });

    // Create route line using Mapbox Directions API
    const getRoute = async () => {
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoords[0]},${pickupCoords[1]};${dropCoords[0]},${dropCoords[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;

      const response = await fetch(url);
      const data = await response.json();

      const route = data.routes[0].geometry;
      const distanceInKm = (data.routes[0].distance / 1000).toFixed(2); // Convert to KM

      // Show distance
      const distanceDiv = document.createElement('div');
      distanceDiv.innerText = `Distance: ${distanceInKm} km`;
      distanceDiv.className = styles.distanceLabel;
      document.getElementById('distance-info')?.appendChild(distanceDiv);

      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: route,
        },
      });

      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#3b9ddd',
          'line-width': 5,
        },
      });

      animateCar(route.coordinates);
    };


    // Add markers
    new mapboxgl.Marker({ color: 'green' }).setLngLat(pickupCoords).addTo(map);
    new mapboxgl.Marker({ color: 'red' }).setLngLat(dropCoords).addTo(map);

    // Animated car icon
    const animateCar = (coordinates) => {
      let counter = 0;
      const carMarker = new mapboxgl.Marker({ color: 'orange' })
        .setLngLat(coordinates[0])
        .addTo(map);
      markerRef.current = carMarker;

      const animate = () => {
        if (counter < coordinates.length) {
          carMarker.setLngLat(coordinates[counter]);
          counter++;
          requestAnimationFrame(animate);
        }
      };

      animate();
    };

    map.on('load', () => {
      getRoute();
    });

    return () => map.remove();
  }, [pickup, drop]);

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>✖ Close</button>
        <div id="distance-info" className={styles.distanceInfo}></div>
        <div ref={mapContainer} className={styles.mapContainer} />
      </div>
    </div>
  );
};

export default TripTrackingMap;

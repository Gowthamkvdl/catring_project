import React from "react";
import "./map.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";

// List of places in Tamil Nadu
const places = [
  { id: 1, name: "Chennai", latitude: 13.0827, longitude: 80.2707 },
  { id: 2, name: "Coimbatore", latitude: 11.0168, longitude: 76.9558 },
  { id: 3, name: "Madurai", latitude: 9.9252, longitude: 78.1198 },
  { id: 4, name: "Tiruchirappalli", latitude: 10.7905, longitude: 78.7047 },
  { id: 5, name: "Salem", latitude: 11.6643, longitude: 78.146 },
  { id: 6, name: "Tirunelveli", latitude: 8.7139, longitude: 77.7567 },
  { id: 7, name: "Vellore", latitude: 12.9165, longitude: 79.1325 },
  { id: 8, name: "Erode", latitude: 11.341, longitude: 77.7172 },
  { id: 9, name: "Tiruppur", latitude: 11.1085, longitude: 77.3411 },
  { id: 10, name: "Thoothukudi", latitude: 8.7642, longitude: 78.1348 },
];

const Map = () => {
  return (
    <MapContainer
      className="map"
      center={[11.1271, 78.6569]}
      zoom={7}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places.map((place, index) => (
        <Pin key={index} item={place} />
      ))}
    </MapContainer>
  );
};

export default Map;

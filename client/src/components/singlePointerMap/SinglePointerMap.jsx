import React from "react";
import "./singlePointerMap.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";


const Map = ({ latitude, longitude }) => {
  return (
    <MapContainer
      className="singlePointermap"
      center={[latitude, longitude]}
      zoom={10}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}></Marker>
    </MapContainer>
  );
};

export default Map;

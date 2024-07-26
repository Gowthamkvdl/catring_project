// locationSelector/LocationSelector.jsx
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DraggableMarker from "../draggableMarker/DraggableMarker";

const LocationSelector = ({ onPositionChange }) => {
  const center = {
    lat: 11.1271,
    lng: 78.6569,
  };

  const handleDragEnd = (newPos) => {
    if (typeof onPositionChange === "function") {
      onPositionChange(newPos); // Forward the new position to the parent component
    }
  };

  return (
    <MapContainer
      className="locationSelector rounded-3"
      center={center}
      zoom={7}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker center={center} onDragEnd={handleDragEnd} />
    </MapContainer>
  );
};

export default LocationSelector;

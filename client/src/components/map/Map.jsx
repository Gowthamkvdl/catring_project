import React from "react";
import "./map.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";

// List of items in Tamil Nadu

const Map = ({ items }) => {
  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={[11.1271, 78.6569]}
        zoom={7}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {items.map((item) => (
          <Pin key={item.postId} item={item} />
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;

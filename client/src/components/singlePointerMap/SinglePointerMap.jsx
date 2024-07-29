import React from "react";
import "./singlePointerMap.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import pin from "../../assets/pin.png";

// Define a custom icon
const customIcon = L.icon({
  iconUrl: pin, // Path to your marker icon
  iconSize: [40, 40], // size of the icon
  // shadowUrl: require("./path/to/your/marker-shadow.png"), // Path to your marker shadow
  // shadowSize: [41, 41], // size of the shadow
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
});

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
      <Marker position={[latitude, longitude]} icon={customIcon}></Marker>
    </MapContainer>
  );
};

export default Map;

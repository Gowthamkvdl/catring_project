import React from "react";
import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import "./pin.css";

// Define a custom icon
const customIcon = L.icon({
  iconUrl: require("../../assets/pin.png"), // Path to your marker icon
  iconSize: [25, 41], // size of the icon
  // shadowUrl: require("./path/to/your/marker-shadow.png"), // Path to your marker shadow
  // shadowSize: [41, 41], // size of the shadow
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
});

const Pin = ({ item }) => {
  return (
    <Marker position={[item.latitude, item.longitude]} icon={customIcon}>
      <Popup>
        <Link to={"/" + item.postId} className="popUp p-0">
          <span>{item.city}</span>
          <span className="fw-bold"> ₹{item.salary}</span>
        </Link>
      </Popup>
    </Marker>
  );
};

export default Pin;

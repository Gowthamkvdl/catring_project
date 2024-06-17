import React from "react";
import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import "./pin.css"

const Pin = ({ item }) => {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <Link to={"single-page/"+item.id} className="popUp p-0">
          <span>{item.name}</span>
          <span className="fw-bold">{item.salary ? "" : " ₹1000"}</span>
        </Link>
      </Popup>
    </Marker>
  );
};

export default Pin;

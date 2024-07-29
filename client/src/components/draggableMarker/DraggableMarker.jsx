// draggableMarker/DraggableMarker.jsx
import React, { useState, useRef, useMemo, useCallback } from "react";
import { Marker, Popup } from "react-leaflet";
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


const DraggableMarker = ({ center, onDragEnd }) => {
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null && typeof onDragEnd === "function") {
          const newPos = marker.getLatLng();
          setPosition(newPos);
          onDragEnd(newPos); // Call the callback with the new position
        }
      },
    }),
    [onDragEnd]
  );

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={customIcon}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>Drag me to select a location</span>
      </Popup>
    </Marker>
  );
};

export default DraggableMarker;

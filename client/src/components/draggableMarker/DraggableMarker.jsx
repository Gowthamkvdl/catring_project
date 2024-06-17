// draggableMarker/DraggableMarker.jsx
import React, { useState, useRef, useMemo, useCallback } from "react";
import { Marker, Popup } from "react-leaflet";

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
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>Drag me to select a location</span>
      </Popup>
    </Marker>
  );
};

export default DraggableMarker;

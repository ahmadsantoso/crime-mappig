import React from "react";

export function MapMarker({ id }) {
  return (
    <Marker>
    <div className="pin bounce " />
      <div className="pulse" />
      <p>{id}</p>
    </Marker>
  );
}
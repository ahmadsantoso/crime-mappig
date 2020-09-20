import React from "react";
import GoogleMapReact from "google-map-react";

export function MapMarker({ id }) {
  return (
    <Marker>
    <div className="pin bounce " />
      <div className="pulse" />
      <p>{id}</p>
    </Marker>
  );
}
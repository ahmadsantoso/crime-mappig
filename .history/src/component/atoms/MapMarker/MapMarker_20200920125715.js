import React from "react";

export function MapMarker({ id }) {
  return (
    <Pin>
    <div className="pin bounce " />
      <div className="pulse" />
      <p>{id}</p>
    </Pin>
  );
}
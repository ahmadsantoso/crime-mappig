import React from "react";

export function MapMarker({ id }) {
  return (
    <>
    <div className="pin" />
      <div className="pulse" />
      <p>{id}</p>
    </>
  );
}
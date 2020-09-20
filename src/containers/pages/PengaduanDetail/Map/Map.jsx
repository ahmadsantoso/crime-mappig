import React from "react";
import GoogleMapReact from "google-map-react";

import { MapMarker } from "../MapMarker/MapMarker";

export function Map({ lat, lng, radius }) {
  return (
    <div style={{ height: "60vh", width: "100%" }}>
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => {
          if (radius !== null) {
            // eslint-disable-next-line no-undef
            return new google.maps.Circle({
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.3,
              map,
              center: {
                lat: lat,
                lng: lng,
              },
              radius: radius,
            });
          }
        }}
        bootstrapURLKeys={{
          key: "AIzaSyCXH_d-DbxpEVyfunY8g8f9pVhC6dEX8bA",
          libraries: ["visualization"],
        }}
        defaultCenter={{
          lat: lat,
          lng: lng,
        }}
        defaultZoom={16}
      >
        <MapMarker lat={lat} lng={lng} />
      </GoogleMapReact>
    </div>
  );
}

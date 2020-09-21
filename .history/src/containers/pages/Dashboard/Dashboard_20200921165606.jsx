import React, { useState, useEffect, useCallback } from "react";
import { MapMarker } from "../../../component/atoms/MapMarker/MapMarker";
import { Filter } from "../Filter/filter";
import dotenv from "dotenv";
import "./Dashboard.css";
import Cookie from "js-cookie";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useHistory, NavLink, Redirect } from "react-router-dom";
import GoogleMapReact from "google-map-react";

const Dashboard = () => {
  const [isRedirect, setRedirect] = useState(false);
  const history = useHistory();
  const [selectedPengaduan, setSelectedPengaduan] = useState(null);
  dotenv.config();

  const isAuth = useStoreActions(
    (actions) => actions.operator.setCurrentOperator
  );

  const FETCH_STATUS = {
    LOADING: "LOADING",
    LOADED: "LOADED",
    ERROR: "ERROR",
  };

    const fetch = useCallback(async () => {
      setStatus(FETCH_STATUS.LOADING);

  const { data, status, filter, setFilter } = useListPengaduan();

  if (status === FETCH_STATUS.ERROR) {
    return <p>Error....</p>;
  }

  if (status === FETCH_STATUS.LOADING) {
    return <p>Loading...</p>;
  }

  if (status !== FETCH_STATUS.LOADED) {
    return <p>s</p>;
  }

};

const logOut = () => {
  setRedirect(true);
  const user = null;
  isAuth(user);
  Cookie.remove("token");
};

if (isRedirect) {
  return <Redirect to="/login" />;
}
  return (
    <div className="container">
      <div style={{ height: "60vh", width: "100%", paddingTop: "20px" }}>
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals={true}
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_KEY,
            libraries: ["visualization"],
          }}
          defaultCenter={{
            lat: -6.21159,
            lng: 106.846711,
          }}
          defaultZoom={11}
        >
          {data.map((p) => (
            <MapMarker
              key={p._id}
              lat={p.location.coordinates[1]}
              lng={p.location.coordinates[0]}
              id={p.keterangan}
            />
          ))}
        </GoogleMapReact>
      </div>
      <div className="dropdown">
        <Filter filter={filter} setFilter={setFilter} />
      </div>
      <div className="tab-legend">
        <ul>
          <li className="valid">Laporan Valid</li>
          <li className="notvalid">Laporan Tidak Valid</li>
          <li className="onprocess">Sudah di Proses</li>
          <li className="notprocess">Belum di Proses</li>
        </ul>
      </div>
    </div>
  )
};
export default Dashboard;

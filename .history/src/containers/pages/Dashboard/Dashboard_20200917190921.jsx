import React, { useState, useRef } from "react";
import dotenv from "dotenv";
import useSwr from "swr";
import "./Dashboard.css";
import Logo from "../../../assets/img/logo/logo.png";
import Cookie from "js-cookie";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useHistory, NavLink, Redirect } from "react-router-dom";
import { GoogleMap, Marker, withScriptjs, withGoogleMap, InfoWindow } from "react-google-maps";

const Dashboard = () => {
  const [isRedirect, setRedirect] = useState(false);
  const history = useHistory();
  const [selectedCrime, setSelectedCrime] = useState(null);

  const isAuth = useStoreActions((actions) => actions.operator.setCurrentOperator);

  // const fetcher = (...args) => fetch(...args).then(response => response.json());
  // const mapRef = useRef();
  // const [bounds, setBounds] = useState(null);
  // const url =
  //   "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10";
  // const { data, error } = useSwr(url, { fetcher });
  // const crimes = data && !error ? data.slice(0, 2000) : [];

  dotenv.config();

  const logOut = () => {
    setRedirect(true);
    const user = null;
    isAuth(user);
    Cookie.remove("token");
  };

  if (isRedirect) {
    return <Redirect to="/login" />;
  }

  const WrappedMap = withScriptjs(withGoogleMap(() => {
    return <GoogleMap
      defaultZoom={11}
      defaultCenter={{ lat: -6.130754, lng: 106.8565124 }}
    >
      {/* {crimes.features.map(crime => (
        <Marker
          key={crime.id}
          position={{
            lat: selectedCrime.location.latitude,
            lng: selectedCrime.location.longitude
          }}
          onClick={() => {
            setSelectedCrime(crime);
          }} />
      ))}
      {selectedCrime && (
        <InfoWindow>
          <div>Mark Details</div>
        </InfoWindow>
      )} */}
    </GoogleMap>;
  }
  ));

  return (
    <div className="container">
      <NavLink className="nav-img" to="/Dashboard"> <img src={Logo} alt="logo" /> </NavLink>
      <div className="nav">
        <button
          className="nav-btn"
          onClick={() => history.push("/Laporan")}
        >Laporan</button>
        <button
          className="nav-btn"
          onClick={() => history.push("/Analisa")}
        >Analisa</button>
        <button
          className="nav-btn"
          onClick={logOut}
        >logout
        </button>
      </div>
      <div className="map">
        <WrappedMap
          googleMapURL={process.env.REACT_APP_GOOGLE_KEY}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
      <div className="dropdown">
        <select>
          <option defaultValue="Laporan">Semua Laporan</option>
          <option value="valid">Valid</option>
          <option value="notvalid">Tidak Valid</option>
          <option value="onprocess">Sudah di Proses</option>
          <option value="notprocess">Belum di Proses</option>
        </select>
      </div>
      <div className="tab-legend">
        <ul>
          <li className="valid">Valid</li>
          <li className="notvalid">Tidak Valid</li>
          <li className="onprocess">Sudah di Proses</li>
          <li className="notprocess">Belum di Proses</li>
        </ul>
      </div>
    </div >
  );
};

export default Dashboard;

import React, { useState, useRef } from "react";
import dotenv from "dotenv";
import useSwr from "swr";
import "./Dashboard.css";
import Logo from "../../../assets/img/logo/logo.png";
import Cookie from "js-cookie";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useHistory, NavLink, Redirect } from "react-router-dom";
// import { GoogleMap, Marker, withScriptjs, withGoogleMap, InfoWindow } from "react-google-maps";
import GoogleMapReact from "google-maps-react";

const Dashboard = () => {
  const [isRedirect, setRedirect] = useState(false);
  const history = useHistory();
  const [selectedPengaduan, setSelectedPengaduan] = useState(null);

  const isAuth = useStoreActions((actions) => actions.operator.setCurrentOperator);

  const fetcher = (...args) => fetch(...args).then(response => response.json());
  const Marker = ({ children }) => children;
  const mapRef = useRef();
  const [bounds, setBounds] = useState(null);
  const url =
    "https://ancient-spire-87228.herokuapp.com/api/operator/pengaduan";
  const { data, error } = useSwr(url, { fetcher });
  const pengaduan = data && !error ? data.slice(0, 2000) : [];

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
        <GoogleMapReact
          bootstrapURLKeys={process.env.REACT_APP_GOOGLE_KEY}
          defaultZoom={11}
          defaultCenter={{ lat: -6.130754, lng: 106.8565124 }}
        >
          {pengaduan.map(pengaduan => (
            <Marker
              key={pengaduan.id}
              lat={selectedPengaduan.location.coordinat[1]}
              lng={selectedPengaduan.location.coordinat[0]}
            >
            </Marker>
          ))}
        </GoogleMapReact>
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

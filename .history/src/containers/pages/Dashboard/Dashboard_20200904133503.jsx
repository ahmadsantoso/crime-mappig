import React, { useState } from "react";
import "./Dashboard.css";
import Logo from "../../../assets/img/logo/logo.png";
import { connect } from "react-redux";
import { useHistory, NavLink, Redirect } from "react-router-dom";
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from "react-google-maps";

const Dashboard = () => {
  const [isRedirect, setRedirect] = useState(false);
  const history = useHistory();

  const logOut = () => {
    setRedirect(true);
    localStorage.clear();
  };

  if (isRedirect) {
    return <Redirect to="/login" />;
  }


  const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={11}
      defaultCenter={{ lat: -6.130754, lng: 106.8565124 }}
    >
      <Marker
        position={{ lat: -6.130754, lng: 106.856512 }}
      />
    </GoogleMap>
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
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCXH_d-DbxpEVyfunY8g8f9pVhC6dEX8bA&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
      <div classname="dropdown">
        <select>
          <option selected value="Laporan">Semua Laporan</option>
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

const reduxState = (state) => ({
  userData: state.user,
});

export default connect(reduxState)(Dashboard);

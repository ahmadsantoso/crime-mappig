import React, { useState, useEffect, useCallback } from "react";
import { MapMarker } from "../../../component/atoms/MapMarker/MapMarker";
import axios from "axios";
import dotenv from "dotenv";
import useSwr from "swr";
import "./Dashboard.css";
import Logo from "../../../assets/img/logo/logo.png";
import Cookie from "js-cookie";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useHistory, NavLink, Redirect } from "react-router-dom";
import GoogleMapReact from "google-map-react";

const Dashboard = () => {
  const [isRedirect, setRedirect] = useState(false);
  const history = useHistory();
  const [selectedPengaduan, setSelectedPengaduan] = useState(null);

  const isAuth = useStoreActions((actions) => actions.operator.setCurrentOperator);

  const FETCH_STATUS = {
    LOADING: "LOADING",
    LOADED: "LOADED",
    ERROR: "ERROR",
  };

  const TOKEN =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNTc4ZTUyMGJlMTUzMDliNzA3ZDM4NSIsImVtYWlsIjoicm9ubnlAZW1haWwuY29tIiwicm9sZSI6Ik9QRVJBVE9SIiwiaWF0IjoxNTk5NTczOTM2LCJleHAiOjE2MDIxNjU5MzZ9.fRjydc68niDOy6r7BTnxjyivSpQlpWGCvbkKl5nH2X8";

  const useListPengaduan = () => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(null);

    const fetch = useCallback(async () => {
      setStatus(FETCH_STATUS.LOADING);
      axios
        .get("https://ancient-spire-87228.herokuapp.com/api/operator/pengaduan", {
          headers: {
            Authorization: TOKEN,
          },
        })
        .then((res) => {
          setData(res.data);
          setStatus("LOADED");
        })
        .catch(() => {
          setStatus("ERROR");
        });
    }, []);

    // useEffect(() => {
    //   fetch();
    // }, [fetch]);

    return {
      data,
      // status,
      // fetch,
    };

  };

  const { data, status } = useListPengaduan();

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
      <div style={{ height: "20%", width: "100%", paddingTop: "20px" }}>
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

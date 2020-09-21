import React, { useState, useEffect, useCallback } from "react";
import { MapMarker } from "../../../component/atoms/MapMarker/MapMarker";
import { Filter } from "./Filter/Filter";
import axios from "axios";
import dotenv from "dotenv";
import { FormControl, FormLabel } from "@chakra-ui/core";
import "./Dashboard.css";
import Cookie from "js-cookie";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useHistory, NavLink, Redirect } from "react-router-dom";
import GoogleMapReact from "google-map-react";

const Dashboard = () => {
  const [isRedirect, setRedirect] = useState(false);
  const history = useHistory();
  const [selectedPengaduan, setSelectedPengaduan] = useState(null);

  const isAuth = useStoreActions(
    (actions) => actions.operator.setCurrentOperator
  );

   const PENGADUAN_STATUS = {
    ALL: "ALL",
    BELUM_DI_PROSES: "BELUM DI PROSES",
    VALID: "LAPORAN VALID",
    TIDAK_VALID: "LAPORAN TIDAK VALID",
    PROSES_TINDAK_LANJUT: "PROSES TINDAK LANJUT",
  };

  const FETCH_STATUS = {
    LOADING: "LOADING",
    LOADED: "LOADED",
    ERROR: "ERROR",
  };

  const useListPengaduan = () => {
    const [filter, setFilter] = useState(PENGADUAN_STATUS.ALL);
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(null);

    const fetch = useCallback(async () => {
      setStatus(FETCH_STATUS.LOADING);

      let url = `https://ancient-spire-87228.herokuapp.com/api/operator/pengaduan`;

    if (filter !== PENGADUAN_STATUS.ALL) {
      url = `${url}?status=${filter}`;
    }

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
      })
      .then((res) => {
        setData(res.data);
        setStatus(FETCH_STATUS.LOADED);
      })
      .catch((err) => setStatus(FETCH_STATUS.ERROR));
  }, [filter]);

  const refresh = useCallback(() => {
    let url = `https://ancient-spire-87228.herokuapp.com/api/operator/pengaduan`;

    if (filter !== PENGADUAN_STATUS.ALL) {
      url = `${url}?status=${filter}`;
    }

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => setStatus(FETCH_STATUS.LOADED));
  }, [filter]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    data,
    status,
    filter,
    setFilter,
    fetch,
    refresh,
  }
  };
  const { data, status, filter } = useListPengaduan();

  if (status === FETCH_STATUS.ERROR) {
    return <p>Error....</p>;
  }

  if (status === FETCH_STATUS.LOADING) {
    return <p>Loading...</p>;
  }

  if (status !== FETCH_STATUS.LOADED) {
    return <p>s</p>;
  }

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
      {/* <NavLink className="nav-img" to="/Dashboard">
        {" "}
        <img src={Logo} alt="logo" />{" "}
      </NavLink> */}
      {/* <div className="nav">
        <button className="nav-btn" onClick={() => history.push("/Laporan")}>
          Laporan
        </button>
        <button className="nav-btn" onClick={() => history.push("/Analisa")}>
          Analisa
        </button>
        <button className="nav-btn" onClick={logOut}>
          logout
        </button>
      </div> */}
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
        <FormControl>
        <Filter filter={filter} setFilter={setFilter} />
        </FormControl>
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
  );

};
export default Dashboard;

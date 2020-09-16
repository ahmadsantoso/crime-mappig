import React, { useState, useEffect, Fragment } from "react";
import { format } from "date-fns";
import Logo from "../../../assets/img/logo/logo.png";
import { useHistory, NavLink, Redirect } from "react-router-dom";
import "./Laporan.css";

const Laporan = () => {

const initialDate = format(new Date(), "dd-MM-yyyy");

const initialState = {
  kejahatan: "",
  nama: "",
  telpon: "",
  alamat: "",
  deskripsi: "",
  date: initialDate,
  textButton: "SAVE",
  noteId: "",
};

  const [isRedirect, setRedirect] = useState(false);
  const history = useHistory();

  const logOut = () => {
    setRedirect(true);
    localStorage.clear();
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
    </div>
  );
};

export default Laporan;

import React, { useState, useEffect, Fragment } from "react";
import "./Analisa.css";
import { format } from "date-fns";
import { connect, useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink, Redirect } from "react-router-dom";
import Logo from "../../../assets/img/logo/logo.png";

const Analisa = () => {
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

export default Analisa;

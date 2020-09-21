import React, { useState, useCallback } from "react";
import { useHistory, NavLink } from "react-router-dom";
import Cookie from "js-cookie";

import Logo from "../../assets/img/logo/logo.png";
import "./navbar.css";

export function Navbar() {
  const [isRedirect, setRedirect] = useState(false);
  const history = useHistory();

  const logOut = useCallback(() => {
    history.push("/login");
    Cookie.remove("token");
  }, [history]);

  if (isRedirect) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <NavLink className="nav-img" to="/Dashboard">
        <img src={Logo} alt="logo" />{" "}
      </NavLink>
      <div className="nav">
        <button className="nav-btn" onClick={() => history.push("/Laporan")}>
          Laporan
        </button>
        <button className="nav-btn" onClick={() => history.push("/Analisa")}>
          Analisa
        </button>
        <button className="nav-btn" onClick={logOut}>
          logout
        </button>
      </div>
    </div>
  );
}

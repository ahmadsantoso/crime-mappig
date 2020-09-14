import React from "react";
import dotenv from 'dotenv'
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Laporan from "../Laporan/Laporan";
import Analisa from "../Analisa/Analisa";
import {
  createStore
} from "redux";
import {
  Provider
} from "react-redux";
import {
  store
} from "../../../config/redux";

// import ProtectedRoute from "./Protected";
// moongose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, () =>
//   console.log('connect to dataase')
// );
// const authRoute = require('../../../config/routes/auth')


function App() {
  return ( <
    Provider store = {
      store
    } >
    <
    Router >
    <
    div >
    <
    Route path = "/Dashboard"
    exact component = {
      Dashboard
    }
    /> <
    Route path = "/Laporan"
    component = {
      Laporan
    }
    /> <
    Route path = "/Analisa"
    component = {
      Analisa
    }
    /> <
    Route path = "/Login"
    component = {
      Login
    }
    /> <
    Route path = "/Register"
    component = {
      Register
    }
    /> <
    /div> <
    /Router> <
    /Provider>
  );
}

export default App;
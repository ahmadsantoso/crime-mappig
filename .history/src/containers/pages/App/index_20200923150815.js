import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Laporan from "../Laporan/Laporan";
import Analisa from "../Analisa/Analisa";
import PengaduanDetail from "../PengaduanDetail/PengaduanDetail";
import RincianLaporan from "../RincianLaporan/RincianLaporan";
import { Navbar } from "../../../component/Navbar/Navbar";

function App() {
  return (
    <Router>
        <Route exact path="/Login" component={Login} />
        <Route path="/Register" component={Register} />
      <div>
    <Navbar />
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/Laporan" component={Laporan} />
        <Route path="/Analisa" component={Analisa} />
        <Route path="/pengaduan/detail/:id" component={PengaduanDetail} />
        <Route path="/rincian/laporan/:id" component={RincianLaporan} />
      </div>
    </Router>
  );
}

export default App;

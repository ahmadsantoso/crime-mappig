import React, { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Laporan from "../Laporan/Laporan";
import Analisa from "../Analisa/Analisa";
import PengaduanDetail from "../PengaduanDetail/PengaduanDetail";
import RincianLaporan from "../RincianLaporan/RincianLaporan";
import { Navbar } from "../../../component/Navbar/Navbar";

const Login = lazy(() => import("containers/pages/Login/Login"));
const Register = lazy(() => import("containers/pages/Register/Register"));

function App() {
  return (
    <Router>
      <Suspense fallback={"loading..."}>
        <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/Register" component={Register} />
        <div>
          <Navbar />
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/Laporan" component={Laporan} />
          <Route path="/Analisa" component={Analisa} />
          <Route path="/pengaduan/detail/:id" component={PengaduanDetail} />
          <Route path="/rincian/laporan/:id" component={RincianLaporan} />
        </div>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;

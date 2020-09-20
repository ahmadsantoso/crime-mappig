import React from "react";
import "./Analisa.css";

import { ListPengaduan } from "./ListPengaduan/ListPengaduan";
import { Navbar } from "../../../component/Navbar/Navbar";

const Analisa = () => {
  return (
    <div className="container">
      <Navbar />
      <ListPengaduan />
    </div>
  );
};

export default Analisa;

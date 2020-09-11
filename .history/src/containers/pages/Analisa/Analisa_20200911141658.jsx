import React, { useState, useEffect, Fragment } from "react";
import "./Analisa.css";
import { format } from "date-fns";
import { connect, useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink, Redirect } from "react-router-dom";
import { PieChart, Pie, Sector, Cell } from "recharts";
import Logo from "../../../assets/img/logo/logo.png";

const Analisa = () => {
  const [isRedirect, setRedirect] = useState(false);
  const history = useHistory();

  const report = [
    { name: 'Jakarta Pusat', value: 500 },
    { name: 'Jakarta Timur', value: 400 },
    { name: 'Jakarta Selatan', value: 300 },
    { name: 'Jakarta Barat', value: 200 },
    { name: 'Jakarta Utara', value: 100 }];

  const COLORS = ['#0088FE', '#ed87eb', '#fc1500', '#3df70f', '#fa7f52'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

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
      <h3>Diagram Tingkat Kejahatan</h3>
      <div className="pie-chart">
        <PieChart width={800} height={400}>
          <Pie
            data={report}
            cx={300}
            cy={200}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
          >
            {
              report.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
        </PieChart>
      </div>
      <div className="tab-legend">
        <ul>
          <li className="kondusif">Kondusif</li>
          <li className="cen-kon">Cenderung Kondusif</li>
          <li className="rawan">Rawan</li>
          <li className="lum-raw">Cukup Rawan</li>
          <li className="san-raw">Sangat Rawan</li>
        </ul>
      </div>
    </div >
  );
};

export default Analisa;

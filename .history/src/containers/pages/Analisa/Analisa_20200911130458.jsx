import React, { useState, useEffect, Fragment } from "react";
import "./Analisa.css";
import { format } from "date-fns";
import { connect, useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink, Redirect } from "react-router-dom";
const { PieChart, Pie, Sector, Cell } = Recharts;
import Logo from "../../../assets/img/logo/logo.png";

const Analisa = () => {
  const [isRedirect, setRedirect] = useState(false);
  const history = useHistory();

  const data = [{ name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 }];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
      <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={300}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
        >
          {
            data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart>
    </div>
  );
};

export default Analisa;
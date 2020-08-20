import React, { Component, Fragment } from 'react';
import './Dashboard.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Dashboard extends Component {
    render() {
        return (
            <div className="container">
                 <h1 className="header">CRIME MAPPING</h1>
                <div className="list">
                    <ul>
                        <li><Link to="/Dashboard/Laporan Kejahatan">Laporan Kejahatan</Link></li>
                    </ul>
                </div>
                <img src="../src/img/thumbnail/Dashboard.png" alt="Image" width="100%"/>
            </div>     
        )
    }
}

const reduxState = (state) => ({
    userData: state.user,
})

export default connect(reduxState, )(Dashboard);
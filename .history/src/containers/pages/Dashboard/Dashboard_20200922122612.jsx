import React, { useState, useEffect, useCallback } from "react";
import { MapMarker } from "../../../component/atoms/MapMarker/MapMarker";
import { FilterMap } from "../Filter/Filter";
import { useListPengaduan, FETCH_STATUS } from "../Laporan/useListPengaduan";
import dotenv from "dotenv";
import { Box, Heading, Button, CircularProgress } from "@chakra-ui/core";
import "./Dashboard.css";
import GoogleMapReact from "google-map-react";

const Dashboard = () => {
 
  dotenv.config();
  
  const {
    data,
    filter,
    setFilter,
    status,
    fetch,
    refresh,
  } = useListPengaduan();

    if (status === FETCH_STATUS.ERROR) {
      return (
        <Box
          d="flex"
          w="100%"
          justifyContent="center"
          alignSelf="center"
          flexDirection="column"
          pb="3"
        >
          <Box
            w={["95%", "75%", "70%", "60%"]}
            justifyContent="center"
            mt="5"
            alignSelf="center"
          >
            <Heading as="h4">Terjadi kesalahan</Heading>
            <Button variant="solid" variantColor="teal" onClick={fetch}>
              Muat Ulang
            </Button>
          </Box>
        </Box>
      );
    }
  
    if (status === FETCH_STATUS.LOADING) {
      return (
        <>
          <Box
            // d="flex"
            // w="100%"
            // alignSelf="center"
            // flexDirection="column"
            // pb="3"
            // height="100vh"
            textAlign="center"
          >
            <CircularProgress marginTop="15rem" isIndeterminate color="teal" />
          </Box>
        </>
      );
    }
  
  return (
    <div className="container">
      <div style={{ height: "60vh", width: "100%", paddingTop: "20px" }}>
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals={true}
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_KEY,
            libraries: ["visualization"],
          }}
          defaultCenter={{
            lat: -6.21159,
            lng: 106.846711,
          }}
          defaultZoom={11}
        >
          {data.map((p) => (
            <MapMarker
              key={p._id}
              lat={p.location.coordinates[1]}
              lng={p.location.coordinates[0]}
              // id={p.keterangan}
            />
          ))}
        </GoogleMapReact>
      </div>
      <div className="dropdown">
      <FilterMap filter={filter} setFilter={setFilter} />
      </div>
      <div className="tab-legend">
        <ul>
          <li className="valid">Laporan Valid</li>
          <li className="notvalid">Laporan Tidak Valid</li>
          <li className="onprocess">Sudah di Proses</li>
          <li className="notprocess">Belum di Proses</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

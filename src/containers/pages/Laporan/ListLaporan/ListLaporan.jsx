import React from "react";
import { CardLaporan } from "./CardLaporan";

export function ListLaporan({ listLaporan, refresh }) {
  return (
    <>
      {listLaporan.map((laporan) => (
        <CardLaporan key={laporan._id} laporan={laporan} refresh={refresh} />
      ))}
    </>
  );
}

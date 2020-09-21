import React, { useState, useEffect, useCallback } from "react";
import { Box, Text, Heading, Button, Spinner, useToast } from "@chakra-ui/core";
import { format } from "date-fns";
import { PENGADUAN_STATUS } from "../useListPengaduan";
import axios from "axios";
import Cookie from "js-cookie";
import { useHistory } from "react-router-dom";

const FORM_STATUS = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

export function CardLaporan({ laporan, refresh }) {
  const [status, setStatus] = useState(FORM_STATUS.IDLE);
  const toast = useToast();
  const history = useHistory();

  const handleTeruskan = useCallback(() => {
    setStatus(FORM_STATUS.LOADING);
    axios
      .post(
        "https://ancient-spire-87228.herokuapp.com/api/operator/validasi/pengaduan",
        { pengaduanId: laporan._id },
        {
          headers: {
            Authorization: `Bearer ${Cookie.get("token")}`,
          },
        }
      )
      .then(() => {
        setStatus(FORM_STATUS.SUCCESS);
        refresh();
      })
      .catch((err) => {
        setStatus(FORM_STATUS.ERROR);
      })
      .finally(() => {
        setStatus(FORM_STATUS.IDLE);
      });
  }, []);

  useEffect(() => {
    if (status === FORM_STATUS.SUCCESS) {
      toast({
        title: "Laporan berhasil diteruskan ke petugas di lapangan",
        status: "success",
        duration: 2000,
      });
    }

    if (status === FORM_STATUS.ERROR) {
      toast({
        title: "Oops terjadi kesalahan, silahkan coba lagi.",
        status: "error",
        duration: 2000,
      });
    }
  }, [status]);

  return (
    <Box
      key={laporan._id}
      marginY={4}
      borderWidth="1px"
      p="10px"
      rounded="lg"
      overflow="hidden"
      onClick={() => history.push(`/rincian/laporan/${laporan._id}`)}
    >
      <Text>
        {format(new Date(laporan.tanggal_dibuat), "HH:mm dd/MM/yyyy")}
      </Text>
      <Heading fontSize={24}>{laporan.jenis_kejahatan.jenis}</Heading>
      <Text>
        Latitude: {laporan.location.coordinates[1]} - Longitude:{" "}
        {laporan.location.coordinates[0]}
      </Text>
      <Text color={getStatusColor(laporan.status_terakhir)}>
        {laporan.status_terakhir}
      </Text>
      {laporan.status_terakhir === PENGADUAN_STATUS.BELUM_DI_PROSES && (
        <Button
          mt={4}
          px={4}
          variant="outline"
          isDisabled={status === FORM_STATUS.LOADING}
          onClick={handleTeruskan}
        >
          {status === FORM_STATUS.LOADING ? <Spinner /> : "TERUSKAN KE PETUGAS"}
        </Button>
      )}
    </Box>
  );
}

function getStatusColor(status) {
  switch (status) {
    case PENGADUAN_STATUS.BELUM_DI_PROSES:
      return "#ffb700";
    case PENGADUAN_STATUS.MENUNGGU_VALIDASI:
      return "#fbff00";
    case PENGADUAN_STATUS.PROSES_VALIDASI:
      return "#95ff00";
    case PENGADUAN_STATUS.VALID:
      return "#00ff51";
    case PENGADUAN_STATUS.TIDAK_VALID:
      return "#ff0000";
    case PENGADUAN_STATUS.PROSES_TINDAK_LANJUT:
      return "#c300ff";
    case PENGADUAN_STATUS.BERHASIL_DITINDAK_LANJUTI:
      return "#00ffb7";

    default:
      return "black";
  }
}

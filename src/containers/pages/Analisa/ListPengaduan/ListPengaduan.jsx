import React, { useCallback } from "react";
import { useListPengaduan, FETCH_STATUS } from "./useListPengaduan";
import { Button, Box, Heading, CircularProgress } from "@chakra-ui/core";

import "./list_pengaduan.css";
import { useHistory } from "react-router-dom";

export function ListPengaduan() {
  const { data, status, fetch } = useListPengaduan();
  const history = useHistory();

  const handleOnClick = useCallback(
    (pengaduanId) => {
      history.push(`/pengaduan/detail/${pengaduanId}`);
    },
    [history]
  );

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
      <Box
        d="flex"
        w="100%"
        justifyContent="center"
        alignSelf="center"
        flexDirection="column"
        pb="3"
      >
        <CircularProgress isIndeterminate color="teal" />
      </Box>
    );
  }

  return (
    <div>
      {data.map((pengaduan) => (
        <div
          key={pengaduan._id}
          className="list-pengaduan"
          onClick={() => handleOnClick(pengaduan._id)}
        >
          <p>Keterangan: {pengaduan.keterangan}</p>
          <p>Status Terakhir: {pengaduan.status_terakhir}</p>
          <p>Jenis Kejahatan: {pengaduan.jenis_kejahatan.jenis}</p>
        </div>
      ))}
    </div>
  );
}

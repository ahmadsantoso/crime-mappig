import React from "react";
import { useParams } from "react-router-dom";
import {
  Heading,
  Button,
  Box,
  CircularProgress,
  Stack,
  Text,
} from "@chakra-ui/core";
import { useRincianLaporan, FETCH_STATUS } from "./useRincianLaporan";
import { format } from "date-fns";

export default function RincianLaporan() {
  const { id } = useParams();
  const { data, status, fetch } = useRincianLaporan(id);

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
    );
  }
  
  return (
    <>
      <Box
        d="flex"
        px={10}
        w="100%"
        justifyContent="center"
        alignSelf="center"
        flexDirection="column"
        pb="3"
      >
        <Box
          marginY={4}
          borderWidth="1px"
          p="10px"
          rounded="lg"
          overflow="hidden"
          minH={"60vh"}
        >
          <Text>
            {format(new Date(data.tanggal_dibuat), "HH:mm dd/MM/yyyy")}
          </Text>
          <Heading>{data.jenis_kejahatan.jenis}</Heading>
          <Stack spacing={1}>
            <Text>Pelapor: {data.masyarakat.nama}</Text>
            <Text>No. Telpon: {data.masyarakat.no_telp}</Text>
            <Text>Foto: {data.foto}</Text>
            <Text>
              Kordinat: Latitude {data.location.coordinates[1]} | Longitude{" "}
              {data.location.coordinates[0]}
            </Text>
            <br /> 
            <Text>
              Petugas: {!data.polisi ? "Belum ada petugas" : data.polisi.nama}
            </Text>
            <Text>No. Telpon: {!data.polisi ? null : data.polisi.no_telp}</Text>
            <Text>Keterangan: {data.keterangan}</Text>
            <Text>Jumalah Korban: {data.jumlah_korban}</Text>
            <Text>Status: {data.status_terakhir}</Text>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

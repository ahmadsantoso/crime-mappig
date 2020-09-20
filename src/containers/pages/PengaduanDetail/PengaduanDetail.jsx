import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Button,
  CircularProgress,
  Stack,
  Text,
  Grid,
} from "@chakra-ui/core";

import { Navbar } from "../../../component/Navbar/Navbar";
import { usePengaduanDetail, FETCH_STATUS } from "./usePengaduanDetail";
import { Map } from "./Map/Map";
import { format } from "date-fns";

export default function PengaduanDetail() {
  let { id } = useParams();
  const { data, status, fetch } = usePengaduanDetail(id);

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
    <>
      <Navbar />
      <Box
        d="flex"
        w="100%"
        justifyContent="center"
        alignSelf="center"
        flexDirection="column"
        pb="3"
      >
        <Map
          lat={data.location.coordinates[1]}
          lng={data.location.coordinates[0]}
          radius={data?.spk?.radius_patroli}
        />
        <Box
          w={["95%", "75%", "70%", "60%"]}
          justifyContent="center"
          mt="5"
          alignSelf="center"
        >
          <Grid
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(1, 1fr)",
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(2, 1fr)",
            ]}
            gap={5}
          >
            <Box w="100%" overflow="hidden" p="5">
              <Stack spacing={2}>
                <Heading as="p">Detail Pengaduan</Heading>
                <Text>Keterangan: {data.keterangan}</Text>
                <Text>Jumlah Korban: {data.jumlah_korban}</Text>
                <Text>
                  Tanggal Pengaduan:{" "}
                  {format(new Date(data.tanggal_dibuat), "dd/MM/yyyy")}
                </Text>
                <Text>Status Terakhir: {data.status_terakhir}</Text>
                <Text>Jenis Kejahatan: {data.jenis_kejahatan.jenis}</Text>
                <Text>Nama Pelapor: {data.masyarakat.nama}</Text>
                <Text>Polisi: {data.polisi.nama}</Text>
              </Stack>
            </Box>

            <Box w="100%" overflow="hidden" p="5">
              <Heading as="p">Hasil SPK</Heading>
              <Stack spacing={2}>
                <Text>Jumlah Petugas: {data.spk.jumlah_petugas}</Text>
                <Text>
                  Radius Patroli: {Math.floor(data.spk.radius_patroli)} meter
                </Text>
                <Text>
                  Intensitas (Dalam Radius 1000 meter): {data.spk.intensitas}{" "}
                  Kasus
                </Text>
              </Stack>
            </Box>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

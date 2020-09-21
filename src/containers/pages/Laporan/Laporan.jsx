import React from "react";
import { Box, Heading, Button, CircularProgress } from "@chakra-ui/core";

import { Filter } from "./Filter/Filter";
import { ListLaporan } from "./ListLaporan/ListLaporan";
import { useListPengaduan, FETCH_STATUS } from "./useListPengaduan";

function Laporan() {
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
    <>
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
          <Filter filter={filter} setFilter={setFilter} />
          <ListLaporan listLaporan={data} refresh={refresh} />
        </Box>
      </Box>
    </>
  );
}

export default Laporan;

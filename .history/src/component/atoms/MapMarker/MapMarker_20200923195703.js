import React from "react";
import { useHistory } from "react-router-dom";
import { useToast, Button } from "@chakra-ui/core";

export function MapMarker({ id, p }) {
  const toast = useToast();
  const history = useHistory();

  return (
    <>
      <div
        className="pin bounce"
        // id={p.jenis_kejahatan.jenis}
        onClick={() =>
          toast({
            title: `${p.jenis_kejahatan.jenis}`,
            position: "top",
            description: (
              <Button
                variantColor="black"
                onClick={() => history.push(`/rincian/laporan/${p._id}`)}
              >
                Klik untuk info lebih detail
              </Button>
            ),
            status: "info",
            duration: 2000,
          })
        }
      />
      <div className="pulse" />
      <p>{id}</p>
    </>
  );
}

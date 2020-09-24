import React from "react";
import { useHistory } from "react-router-dom";
import { useToast, Button } from "@chakra-ui/core";

export function MapMarker({  }) {
  const toast = useToast();
  const history = useHistory();

  return (
    <>
      <div
        className="pin bounce"
        onClick={() =>
          toast({
            title: `${jenis_kejahatan.jenis}`,
            position: "top",
            description: (
              <Button
                variantColor=""
                onClick={() => history.push(`/rincian/laporan/${_id}`)}
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
    </>
  );
}

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";

export const PENGADUAN_STATUS = {
  ALL: "ALL",
  BELUM_DI_PROSES: "BELUM DI PROSES",
  MENUNGGU_VALIDASI: "MENUNGGU VALIDASI",
  PROSES_VALIDASI: "PROSES VALIDASI",
  VALID: "LAPORAN VALID",
  TIDAK_VALID: "LAPORAN TIDAK VALID",
  PROSES_TINDAK_LANJUT: "PROSES TINDAK LANJUT",
  BERHASIL_DITINDAK_LANJUTI: "BERHASIL DI TINDAK LANJUTI",
};

export const FETCH_STATUS = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
};

export function useListPengaduan() {
  const [filter, setFilter] = useState(PENGADUAN_STATUS.ALL);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(FETCH_STATUS.LOADING);

  const fetch = useCallback(() => {
    setStatus(FETCH_STATUS.LOADING);

    let url = `https://ancient-spire-87228.herokuapp.com/api/operator/pengaduan`;

    if (filter !== PENGADUAN_STATUS.ALL) {
      url = `${url}?status=${filter}`;
    }

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
      })
      .then((res) => {
        setData(res.data);
        setStatus(FETCH_STATUS.LOADED);
      })
      .catch((err) => setStatus(FETCH_STATUS.ERROR));
  }, [filter]);

  const refresh = useCallback(() => {
    let url = `https://ancient-spire-87228.herokuapp.com/api/operator/pengaduan`;

    if (filter !== PENGADUAN_STATUS.ALL) {
      url = `${url}?status=${filter}`;
    }

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => setStatus(FETCH_STATUS.LOADED));
  }, [filter]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    data,
    status,
    filter,
    setFilter,
    fetch,
    refresh,
  };
}

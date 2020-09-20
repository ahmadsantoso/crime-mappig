import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";

export const FETCH_STATUS = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
};

export function useListPengaduan() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(FETCH_STATUS.LOADING);

  const fetch = useCallback(() => {
    setStatus(FETCH_STATUS.LOADING);
    axios
      .get("https://ancient-spire-87228.herokuapp.com/api/operator/pengaduan", {
        headers: {
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
      })
      .then((res) => {
        setData(res.data);
        setStatus(FETCH_STATUS.LOADED);
      })
      .catch((err) => setStatus(FETCH_STATUS.ERROR));
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    data,
    status,
    fetch,
  };
}

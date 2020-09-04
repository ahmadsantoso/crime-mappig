import React, { useState, useEffect, Fragment } from "react";
import { format } from "date-fns";
import Logo from "../../../assets/img/logo/logo.png";
import { useHistory } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import "./Laporan.css";

import {
  addDataToAPI,
  getDataFromAPI,
  updateDataAPI,
  deleteDataAPI,
} from "../../../config/redux/action";

const initialDate = format(new Date(), "dd-MM-yyyy");
const history = useHistory();

const initialState = {
  kejahatan: "",
  nama: "",
  telpon: "",
  alamat: "",
  deskripsi: "",
  date: initialDate,
  textButton: "SAVE",
  noteId: "",
};

const Laporan = () => {
  const [{ kejahatan, nama, telpon, alamat, deskripsi, date, noteId, textButton }, setState] = useState(
    initialState
  );

  const [isRedirect, setIsRedirect] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));

  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const saveNotes = (data) => dispatch(addDataToAPI(data));
  const getNotes = (data) => dispatch(getDataFromAPI(data));
  const updateNotes = (data) => dispatch(updateDataAPI(data));
  const deleteNotes = (data) => dispatch(deleteDataAPI(data));

  useEffect(() => {
    getNotes(userData.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveNotes = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    const data = {
      kejahatan,
      date,
      nama,
      telpon,
      alamat,
      deskripsi,
      userId: userData.uid,
    };

    if (textButton === "SAVE") {
      saveNotes(data);
      alert("SUCCESS");
      setState({ ...initialState });
    } else {
      data.noteId = noteId;
      updateNotes(data);
      alert("UPDATE SUCCESS");
    }
  };

  const onInputChange = (e) => {
    const { id, value } = e.target;
    setState((state) => ({ ...state, [id]: value }));
  };

  const onUpdateNotes = (note) => {
    const { data, id } = note;
    setState({
      kejahatan: data.kejahatan,
      nama: data.nama,
      telpon: data.telpon,
      alamat: data.alamat,
      deskripsi: data.deskripsi,
      textButton: "UPDATE",
      noteId: id,
      date: initialDate,
    });
    updateNotes(data);
  };

  const cancelUpdate = () => {
    setState({
      kejahatan: "",
      nama: "",
      telpon: "",
      alamat: "",
      deskripsi: "",
      textButton: "SAVE",
      noteId,
    });
  };

  const onDeleteNotes = (note) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      userId: userData.uid,
      noteId: note.id,
    };
    deleteNotes(data);
    alert("DELETE SUCCESS");
  };

  const logOut = () => {
    setIsRedirect(true);
    localStorage.clear();
  };

  if (isRedirect) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <NavLink className="nav-img" to="/Dashboard"> <img src={Logo} alt="logo" /> </NavLink>
      <div className="nav">
        <button
          className="nav-btn"
          onClick={() => history.push("/Laporan")}
        >Laporan</button>
        <button
          className="nav-btn"
          onClick={() => history.push("/Analisa")}
        >Analisa</button>
        <button
          className="nav-btn"
          onClick={logOut}
        >logout
        </button>
      </div>
      <div className="input-form">
        <input
          placeholder="Kejahatan"
          className="input-title"
          id="kejahatan"
          value={kejahatan}
          onChange={onInputChange}
        />
        <input
          placeholder="Nama"
          className="input-content"
          id="nama"
          value={nama}
          onChange={onInputChange}
        />
        <input
          placeholder="Telpon"
          className="input-content"
          id="telpon"
          value={telpon}
          onChange={onInputChange}
        />
        <input
          placeholder="Alamat"
          className="input-content"
          id="alamat"
          value={alamat}
          onChange={onInputChange}
        />
        <input
          placeholder="Deskripsi"
          className="input-content"
          id="deskripsi"
          value={deskripsi}
          onChange={onInputChange}
        />
        {textButton === "UPDATE" ? (
          <button className="btn-cancel" onClick={cancelUpdate}>
            CANCEL
          </button>
        ) : null}
        <button className="btn-save" onClick={handleSaveNotes}>
          {textButton}
        </button>
      </div>
      {notes.length > 0 ? (
        <Fragment>
          {notes.map((note) => {
            return (
              <div className="card-content" key={note.id}>
                <button
                  className="btn-update"
                  onClick={() => onUpdateNotes(note)}
                >
                  {" "}
                  Update{" "}
                </button>
                <button
                  className="btn-delete"
                  onClick={() => onDeleteNotes(note)}
                >
                  {" "}
                  Delete{" "}
                </button>
                <p className="title">{note.data.kejahatan}</p>
                <p className="date">{note.data.date}</p>
                <p className="date">{note.data.alamat}</p>
                <p className="nama">{note.data.nama}</p>
                <p className="date">{note.data.telpon}</p>
                <p className="content">{note.data.deskripsi}</p>
              </div>
            );
          })}
        </Fragment>
      ) : null}
    </div>
  );
};

export default Laporan;

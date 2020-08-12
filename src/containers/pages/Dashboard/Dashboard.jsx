import React, { Component, Fragment } from 'react';
import './Dashboard.css';
import { addDataToAPI, getDataFromAPI, updateDataAPI, deleteDataAPI } from '../../../config/redux/action';
import { connect } from 'react-redux';


class Dashboard extends Component {
    state = {
        title: '',
        content: '',
        date: '',
        textButton: 'SAVE',
        noteId: ''
    }

    componentDidMount() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        this.props.getNotes(userData.uid);
    }

    handleSaveNotes = () => {
        const { title, content, date, textButton, noteId } = this.state;
        const { saveNotes, updateNotes } = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'))

        const data = {
            title: title,
            content: content,
            date: date,
            userId: userData.uid
        }
        if (textButton === 'SAVE') {
            saveNotes(data)
            alert('SUCCESS')
            this.setState({
                title: '',
                date: '',
                content: ''
            })
        } else {
            data.noteId = noteId;
            updateNotes(data)
            alert('UPDATE SUCCESS')
        }
    }

    onInputChange = (e, type) => {
        this.setState({
            [type]: e.target.value
        })
    }

    updateNotes = (note) => {
        this.setState({
            title: note.data.title,
            date: note.data.date,
            content: note.data.content,
            textButton: 'UPDATE',
            noteId: note.id
        })
    }

    cancelUpdate = () => {
        this.setState({
            title: '',
            date: '',
            content: '',
            textButton: 'SAVE'
        })

    }

    deleteNotes = (note) => {
        const { deleteNotes } = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'))
        const data = {
            userId: userData.uid,
            noteId: note.id
        }
        deleteNotes(data)
        alert('DELETE SUCCESS')
    }

    //    polsekSubmit = () => {
    //        const { history } = this.props;
    //        history.push('/Dashboard/Polsek')
    //    }
    render() {
        const { title, content, date, textButton } = this.state;
        const { notes } = this.props;
        const { updateNotes, cancelUpdate } = this;
        return (
            <div className="container">
                <h1 className="header">CRIME MAPPING</h1>
                <div className="list">
                    <ul>
                        <li><a href="/">Laporan Kejahatan</a></li>
                    </ul>
                </div>
                <div className="input-form">
                    <input placeholder="Title" className="input-title" value={title} onChange={(e) => this.onInputChange(e, 'title')} />
                    <input placeholder="Date" className="input-date" value={date} onChange={(e) => this.onInputChange(e, 'date')} />
                    <input placeholder="Content" className="input-content" value={content} onChange={(e) => this.onInputChange(e, 'content')} />
                    {
                        textButton === 'UPDATE' ? (
                            <button className="btn-cancel" onClick={this.handleSaveNotes} onClick={cancelUpdate}>CANCEL</button>
                        ) : null
                    }
                    <button className="btn-save" onClick={this.handleSaveNotes}>{textButton}</button>
                </div>
                {
                    notes.length > 0 ? (
                        <Fragment>
                            {
                                notes.map(note => {
                                    return (
                                        <div className="card-content" key={note.id}>
                                            <button className="btn-update" onClick={() => updateNotes(note)}> Update </button>
                                            <button className="btn-delete" onClick={() => this.deleteNotes(note)}> Delete </button>
                                            <p className="title">{note.data.title}</p>
                                            <p className="date">{note.data.date}</p>
                                            <p className="content">{note.data.content}</p>
                                        </div>
                                    )
                                })
                            }
                        </Fragment>
                    ) : null
                }
            </div>
        )
    }
}

const reduxState = (state) => ({
    userData: state.user,
    notes: state.notes
})

const reduxDispatch = (dispatch) => ({
    saveNotes: (data) => dispatch(addDataToAPI(data)),
    getNotes: (data) => dispatch(getDataFromAPI(data)),
    updateNotes: (data) => dispatch(updateDataAPI(data)),
    deleteNotes: (data) => dispatch(deleteDataAPI(data)),
})

export default connect(reduxState, reduxDispatch)(Dashboard);
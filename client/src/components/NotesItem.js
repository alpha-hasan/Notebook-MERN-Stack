import React, { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';

const NotesItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, editNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{props.note.title}</h5>
                    <p className="card-text">{props.note.desc}</p>
                    <i className="fa-solid fa-pen" onClick={() => { editNote(note) }}></i>
                    <i className="fa-solid fa-trash mx-3" onClick={() => { deleteNote(note._id) }}></i>
                </div>
            </div>
        </div>
    )
}

export default NotesItem
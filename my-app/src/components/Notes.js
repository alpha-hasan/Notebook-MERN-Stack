import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import NotesItem from './NotesItem';
import AddNote from './AddNote';
import NoteContext from '../context/notes/NoteContext';

const Notes = () => {
    const context = useContext(NoteContext);
    let history = useHistory();
    const { notes, fetchNotes, updateNote } = context;
    const [editedNote, setEditedNote] = useState({ id: "", editedTitle: "", editedDesc: "", editedTag: "" });
    const refOpen = useRef(null);
    const refClose = useRef(null);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchNotes();
        }
        else {
            history.push('/login');
        }
        // eslint-disable-next-line
    }, [])
    const editNote = (currentNote) => {
        refOpen.current.click();
        setEditedNote({ id: currentNote._id, editedTitle: currentNote.title, editedDesc: currentNote.desc, editedTag: currentNote.tag });
    }

    const onClickHandle = () => {
        updateNote(editedNote.editedTitle, editedNote.editedDesc, editedNote.editedTag, editedNote.id);
        refClose.current.click();
    }

    const onChangeHandle = (e) => {
        setEditedNote({ ...editedNote, [e.target.name]: e.target.value });
    }

    return (
        <>
            <AddNote />
            <button type="button" ref={refOpen} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Your Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='editedTitle' value={editedNote.editedTitle} onChange={onChangeHandle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="exampleInputPassword1" name='editedDesc' value={editedNote.editedDesc} onChange={onChangeHandle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="exampleInputPassword1" name='editedTag' value={editedNote.editedTag} onChange={onChangeHandle} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Discard</button>
                            <button type="button" className="btn btn-primary" disabled={editedNote.editedTitle.length < 3 || editedNote.editedDesc.length < 5} onClick={onClickHandle}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-1">
                    {notes.length === 0 && 'No Notes Found'}
                </div>
                {notes.map((note) => {
                    return <NotesItem key={note._id} note={note} editNote={editNote} />
                })}
            </div>
        </>
    )
}

export default Notes
import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    // for development
    const host = 'http://localhost:80';

    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);
    const [alert, setAlert] = useState(null);

    // Alert Factory Start


    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null)

        }, 1000);
    }

    // Alert Factory End

    // Fetch

    const fetchNotes = async () => {

        // Fetching Notes : Backend
        try {
            const response = await fetch(`/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });
            const json = await response.json();

            // Fetching Notes : Frontend

            setNotes(json);
        } catch (error) {
            console.log('ERROR::::', error.message);
        }

    }



    // Notes-CRUD


    // Note: Add

    const addNote = async (title, desc, tag) => {

        // Adding Note : Backend

        const response = await fetch(`/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, desc, tag })
        });
        const json = await response.json();
        console.log(json);

        // Adding Note : Frontend

        setNotes(notes.concat(json));
        showAlert('Note Added Successfully.', 'success');
    }

    // Note: Update

    const updateNote = async (title, desc, tag, id) => {

        // Updating Note : Backend

        const response = await fetch(`/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, desc, tag })
        });
        const json = await response.json();
        console.log(json);

        // updating Note : Frontend

        let tempNote = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < tempNote.length; index++) {
            const element = tempNote[index];
            if (element._id === id) {
                tempNote[index].title = title;
                tempNote[index].desc = desc;
                tempNote[index].tag = tag;
                setNotes(tempNote);
                showAlert('Note Updated Successfully.', 'success');
                break;
            }
        }
    }

    // Note: Delete

    const deleteNote = async (id) => {

        // Deleting Note : Backend

        const response = await fetch(`/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json)

        // Deleting Note : Frontend

        const filteredNotes = notes.filter((notes) => { return notes._id !== id });
        setNotes(filteredNotes);
        showAlert('Note Deleted Successfully.', 'success');
    }


    return (
        <NoteContext.Provider value={{ notes, fetchNotes, addNote, updateNote, deleteNote, alert, showAlert }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
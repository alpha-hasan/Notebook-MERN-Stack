import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext';

const AddNotes = () => {
  const [note, setNote] = useState({ title: "", desc: "", tag: "default" });
  const context = useContext(noteContext);
  const { addNote } = context;

  const onClickHandle = (e) => {
    e.preventDefault();
    addNote(note.title, note.desc, note.tag);
    setNote({ title: "", desc: "", tag: "default" });
  }

  const onChangeHandle = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  return (
    <div className='container my-4'>
      <h2>Add A Note</h2>
      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='title' value={note.title} onChange={onChangeHandle} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
          <input type="text" className="form-control" id="exampleInputPassword1" name='desc' value={note.desc} onChange={onChangeHandle} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
          <input type="text" className="form-control" id="exampleInputPassword1" name='tag' value={note.tag} onChange={onChangeHandle} />
        </div>
        <button type="submit" disabled={note.title.length < 3 || note.desc.length < 5} className="btn btn-primary" onClick={onClickHandle}>Add Note</button>
      </form>
    </div>
  )
}

export default AddNotes;
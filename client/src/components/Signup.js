import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import { useHistory } from 'react-router-dom';

const Signup = () => {
  const context = useContext(NoteContext);
  const history = useHistory();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });

  const onChangeHandle = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  const onSubmitHandle = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/auth/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);
    if (json.accessToken) {
      // Redirect
      localStorage.setItem('token', json.accessToken);
      history.push('/');
      context.showAlert('Account Created Successfully.', 'success');
    }
    else {
      context.showAlert('Invalid Credentials.', 'danger');
    }
  }
  return (
    <>
      <h2 className='my-3'>Create An Account</h2>
      <form className='my-4' onSubmit={onSubmitHandle}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name='name' id="name" aria-describedby="emailHelp" value={credentials.name} minLength={3} required onChange={onChangeHandle} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" value={credentials.email} minLength={3} required onChange={onChangeHandle} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' id="password" value={credentials.password} minLength={6} required onChange={onChangeHandle} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default Signup
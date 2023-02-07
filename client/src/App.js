import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NoteState from "./context/notes/NoteState"
import UserState from "./context/users/UserState"
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <UserState>
      <NoteState>
        <Router>
          <Navbar />
          <Alert />
          <div className="container">
            <Switch>
              <Route excat path="/login">
                <Login />
              </Route>
              <Route excat path="/signup">
                <Signup />
              </Route>
              <Route excat path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </UserState>
  );
}

export default App;

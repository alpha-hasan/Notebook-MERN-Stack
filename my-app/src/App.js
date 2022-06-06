import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState"
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert />
        <div className="container">
          <Switch>
            <Route excat path="/about">
              <About />
            </Route>
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
  );
}

export default App;

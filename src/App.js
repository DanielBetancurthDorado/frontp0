import "./App.css";
import React, { useState } from "react";
import Login from "./components/login.js";
import Signup from "./components/signup.js";
import Principal from "./components/principal.js";
import { Context } from "./hooks/context.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  const [context, setContext] = useState("default context value");
  return (
    <Context.Provider value={[context, setContext]}>
    <Router>
      <Switch>
        <Route path="/usuarios/:id/eventos">
          <Principal />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Signup />
        </Route>
      </Switch>
    </Router>
    </Context.Provider>

  );
}

export default App;

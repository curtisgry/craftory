import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import LogIn from "./pages/LogIn";
import NavBar from "./components/NavBar";
import { useState } from "react";
import { UserProvider } from "./context/UserContext";
import { UserListProvider } from "./context/UserListsContext";
import NotFound from "./pages/404";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

function App() {
  const [update, setUpdate] = useState(false);

  function toggleUpdate() {
    setUpdate((last) => !last);
  }

  return (
    <UserProvider>
      <UserListProvider>
        <div className="App">
          <Router>
            <div>
              <NavBar update={update} toggleUpdate={toggleUpdate} />

              <Switch>
                <Route exact path="/">
                  <Home update={update} toggleUpdate={toggleUpdate} />
                </Route>
                <Route path="/signup">
                  <SignUp />
                </Route>
                <Route path="/login">
                  <LogIn toggleUpdate={toggleUpdate} />
                </Route>
                <Route path="/dashboard/:id">
                  <Dashboard />
                </Route>
                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </div>
          </Router>
        </div>
      </UserListProvider>
    </UserProvider>
  );
}

export default App;

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import UserWelcome from "./components/layout/UserWelcome";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useState } from "react";
import Receptionist from "./components/ReceptionistView/Receptionist.js";
import { UserContext } from "./Contexts/UserContext";
import SignIn from "./components/Authentication/signin";
import HomePage from "./components/HomePage/homepage";
import Branches from "./components/Branches/branches";

function App() {
  const [user, setUser] = useState({
    id: 1,
    first: "FirstN",
    last: "LastN",
    position: "Position",
    authenticated: true,
  });

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Switch>
          
          <Route exact path="/CSI-2132">
            <Navbar
              List={[
                { display: "Sign In", path: "/CSI-2132/Sign In" },
                { display: "Branches", path: "/CSI-2132/branches" },
              ]}
            />
            <HomePage />
            <Footer />
            <Footer />
          </Route>


          <Route exact path="/CSI-2132/signin">
            <Navbar
              List={[
                { display: "Home Page", path: "/CSI-2132" },
                {},
              ]}
            />
            <SignIn />
            <Footer />
          </Route>

          <Route exact path="/CSI-2132/receptionist">
            <Navbar
              List={[
                { display: "Home Page", path: "/CSI-2132/" },
                { display: "Branches", path: "/CSI-2132/branches" },
                {  },
              ]}
            />
            <UserWelcome />
            <Receptionist />
            <Footer />
          </Route>

          <Route exact path="/CSI-2132/branches">
            <Navbar
              List={[
                { display: "Clients", path: "/CSI-2132/" },
                { display: "Doctors", path: "/CSI-2132" },

              ]}
            />
            <Branches />
            <Footer />
          </Route>

          <Route exact path="/*">
            <Redirect to={"/CSI-2132/"} />
          </Route>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;

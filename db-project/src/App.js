import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {useState} from "react";

import {UserContext} from "./Contexts/UserContext"
import SignIn from "./components/Authentication/signin";

function App() {
  const [user, setUser] = useState({
    id: null,
    firstName: null,
    lastName: null,
    authenticated: null,
  });


  return (
    
    <Router>
      <UserContext.Provider value = {{user, setUser}}>
      <Switch>
        <Route exact path="/CSI-2132">
          <Navbar
            List={[
              { display: "Branches", path: "/CSI-2132" },
              { display: "Sign In", path: "/CSI-2132/signin" },
              { display: "Sign Up", path: "/CSI-2132" },
            ]}
          />
        
          <Footer />
        </Route>

        <Route exact path="/CSI-2132/signin">
          <Navbar
            List={[
              { display: "Home", path: "/CSI-2132" },
              { display: "Sign Up", path: "/CSI-2132" },
            ]}
          />
          <SignIn />
          <Footer />
        </Route>

        <Route exact path="/*">
          <Redirect to={"/CSI-2132"} />
        </Route>
      </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;

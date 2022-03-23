import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (

      <Router>

      <Switch>

        <Route exact path = "/CSI-2132">
        <Navbar List = {[ { display : "Branches", path : "/"}, { display : "Sign In", path : "/signin"},  { display : "Sign Up", path : "/"}]}/>
        <Footer/>
        </Route>

        <Route exact path = "/signin">
        <Navbar List = {[ { display : "Home", path : "/CSI-2132"} , { display : "Sign Up", path : "/"}]}/>
        <Footer/>
        </Route>

        <Route exact path = "/*">
        <Redirect to = {'/CSI-2132'} />
        </Route>


     
      </Switch>

        

      </Router>
    

  );
}

export default App;

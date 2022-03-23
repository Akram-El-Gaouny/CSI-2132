import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (

      <Router>

      <Switch>

        <Route exact path = "/">
        <Navbar List = {[ { display : "Branches", path : "/"}, { display : "Sign In", path : "/signin"},  { display : "Sign Up", path : "/"}]}/>
        <Footer/>
        </Route>

        <Route exact path = "/signin">
        <Navbar List = {[ { display : "Home", path : "/"} , { display : "Sign Up", path : "/"}]}/>
        <Footer/>
        </Route>

        <Route exact path = "/*">
        <Redirect to = {'/'} />
        </Route>


     
      </Switch>

        

      </Router>
    

  );
}

export default App;

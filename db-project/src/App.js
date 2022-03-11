import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Footer/>
      </Router>
    </>
  );
}

export default App;

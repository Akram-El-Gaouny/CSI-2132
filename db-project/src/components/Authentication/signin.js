import "./signin.css";
import { useState, useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import axios from "axios";
import { useHistory } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("patient");
  const [message, setMessage] = useState("");
  const user = useContext(UserContext);
  const h = useHistory();
  const authenticate = (e) => {

    e.preventDefault();

    let endpoint = `http://localhost:8000/authenticatePatient?email=${email}&password=${password}`

    if (position !== "patient"){
      endpoint = `http://localhost:8000/authenticateEmployee?email=${email}&password=${password}&position=${position.toLowerCase()}`
    }

    axios
      .get(
        endpoint
      )
      .then(function (response) {
        return response.data.queryResults[0];
      })
      .then((data) => {
    
        user.setUser({
          id: data.userID,
          firstName: data.first,
          lastName: data.last,
          position: position,
          authenticated: true
        }); 


        if (position === "patient"){
          h.push("/CSI-2132/patient")
        }else if (position === "receptionist"){
          h.push("/CSI-2132/receptionist")
        }else if (position === "dentist" || position === "hygenist"){
          h.push("/CSI-2132/dentist")
        }
  
      })


      .catch((err) => {
        if (err.message === "Request failed with status code 400") {
          setMessage(
            "Please make sure that you have entered all the requested data."
          );
          return;
        } else if (err.message === "Request failed with status code 500") {
          setMessage("A server error has occured");
          return;
        } else if (err.message === "Request failed with status code 404") {
          setMessage("Incorrect username or password");
          return;
        }
      });

    



  };

  return (
    <div className="signin">
      <div className="container-fluid">
        <div className="row justify-content-center mt-5">
          <div id="signInBorder" className="col-lg-4 pt-5">
            <div className="justify-item-center text-center formTitle">
              Sign In From
            </div>
            <form>
              <div className="form-group mt-3 ">
                <label></label>
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>

              <select
                id="selectionFormSignIN"
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setPosition(e.target.value)}
              >
                <option value="patient">Patient</option>
                <option value="receptionist">Receptionist</option>
                <option value="dentist">Dentist</option>
                <option value="hygienist">Hygenist</option>
              </select>

              <div className=" text=-center error">{message}</div>
              <div className="text-center" onClick={authenticate}>
                <div className="btn btn-dark mb-5">Submit</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

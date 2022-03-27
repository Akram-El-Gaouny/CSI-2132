import "./signin.css";
import { useState, useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("patient");
  const [message, setMessage] = useState("");
  const user = useContext(UserContext);

  const authenticate = (e) => {
    e.preventDefault();

    axios
      .get(
        `http://localhost:8000/authenticate?email=${email}&password=${password}&position=${position}`
      )
      .then(function (response) {
        return response.data;
      })
      .then((data) => {
        user.setUser({
          id: data.userId,
          firstName: data.first,
          lastName: data.last,
          position: data.position,
          authenticated: true
        });
      })

      .catch((err) => {
        console.log();
        if (err.message === "Request failed with status code 400") {
          setMessage(
            "Please make sure that you have entered all the requested data."
          );
        } else if (err.message === "Request failed with status code 500") {
          setMessage("A server error has occured");
        } else if (err.message === "Request failed with status code 404") {
          setMessage("The user does not exist");
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

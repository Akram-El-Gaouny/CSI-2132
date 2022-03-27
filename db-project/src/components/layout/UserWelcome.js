import { UserContext } from "../../Contexts/UserContext";
import { useState, useContext } from "react";
import "./UserWelcome.css"



const UserWelcome = () => {
    let user = useContext(UserContext);

  return (
    <div className="UserWelcome">
      <div className="container-fluid">
        <div className="row justify-content-between text-center p-1 userInfo">
          <div className="col-2 username">{user.user.first.toUpperCase() + " " + user.user.last.toUpperCase()}</div>
          <div className="col-2 position">{user.user.position.toUpperCase()}</div>
        </div>

      </div>
    </div>
  );
};

export default UserWelcome;

import "./ReceptionistView.css";
import { useState } from "react";
import Addpatient from "./subViews/Addpatient";
import Editpatient from "./subViews/Editpatient";
import Deletepatient from "./subViews/Deletepatient";




const Receptionist = () => {
  
    const [currentView, setCurrentView] = useState(<Addpatient />);

    let HandleNav = function (e, option) {
    
        if (option === "ADD"){
            setCurrentView(<Addpatient />)
        }else if (option === "EDIT"){
            setCurrentView(<Editpatient />)
        }else{
            setCurrentView(<Deletepatient />)
        }
    
    }
    
  return (
    <div className="Receptionist">
      <div className="row justify-content-center text-center receptionist-options">
        <div className="col"  value="ADD" onClick={(e) => HandleNav(e, "ADD")}>Add Patient</div>

        <div className="col"  value="EDIT" onClick={(e) => HandleNav(e, "EDIT")} >Edit Patient</div>

        <div className="col" value="DELETE" onClick={(e) => HandleNav(e, "DELETE") }>Delete Patient</div>
      </div>

      <div className="row">
        <div className="col">{currentView}</div>
      </div>
    </div>
  );
};

export default Receptionist;

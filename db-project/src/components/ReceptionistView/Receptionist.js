import "./ReceptionistView.css";
import { useState } from "react";
import Addpatient from "./subViews/Addpatient";
import Editpatient from "./subViews/Editpatient";
import Deletepatient from "./subViews/Deletepatient";
import AddEmployee from "./subViews/AddEmployee";
import BookAppointment from "./subViews/BookAppointment";


const Receptionist = () => {
  
    const [currentView, setCurrentView] = useState(<Addpatient />);

    let HandleNav = function (e, option) {
    
        if (option === "ADD"){
            setCurrentView(<Addpatient />)
        }else if (option === "EDIT"){
            setCurrentView(<Editpatient />)
        }else if (option === "DELETE"){
            setCurrentView(<Deletepatient />)
        }else if (option === "ADDE"){
            setCurrentView(<AddEmployee />)
        }else{
          setCurrentView(<BookAppointment />)
        }
    
    }
    
  return (
    <div className="Receptionist">
      <div className="row justify-content-center text-center receptionist-options">
        <div className="col"  value="ADD" onClick={(e) => HandleNav(e, "ADD")}>Add Patient</div>

        <div className="col"  value="EDIT" onClick={(e) => HandleNav(e, "EDIT")} >Edit Patient</div>

        <div className="col" value="DELETE" onClick={(e) => HandleNav(e, "DELETE") }>Delete Patient</div>

        <div className="col" value="ADDE" onClick={(e) => HandleNav(e, "ADDE") }>Add Employee</div>

        <div className="col" value="BOOK" onClick={(e) => HandleNav(e, "BOOK") }>Book Appointment</div>
      </div>

      <div className="row">
        <div className="col">{currentView}</div>
      </div>
    </div>
  );
};

export default Receptionist;

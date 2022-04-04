import "./PatientView.css";
import { useState } from "react";
import Appointments from "./subViews/Appointments";
import History from "./subViews/History";




const Patient = () => {
  
    const [currentView, setCurrentView] = useState(<Appointments />);

    let HandleNav = function (e, option) {
    
        if (option === "Appointments"){
            setCurrentView(<Appointments />)
        }else {
            setCurrentView(<History />)
        }
    
    }
    
  return (
    <div className="Patient">
      <div className="row justify-content-center text-center patient-options">
        <div className="col"  value="Appointments" onClick={(e) => HandleNav(e, "Appointments")} >View Appointments</div>

        <div className="col"  value="History" onClick={(e) => HandleNav(e, "History")}>View History</div>
      </div>

      <div className="row">
        <div className="col">{currentView}</div>
      </div>
    </div>
  );
};

export default Patient;

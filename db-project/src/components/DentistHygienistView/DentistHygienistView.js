import { useState } from "react";
import MedicalHistory from "./MedicalHistory";
import "./Dentist.css";
import Appointments from "./Appointments";

const DentistHygienistView = () => {
  
  const [currentView, setCurrentView] = useState(<Appointments />);

  let HandleNav = function (e, option) {
  
      if (option === "appoint"){
          setCurrentView(<Appointments />)
      }else if (option === "medical"){
          setCurrentView(<MedicalHistory />)
      }
  
  }
  
return (
  <div className="Receptionist">
    <div className="row justify-content-center text-center receptionist-options">

      <div className="col"  value="appoint" onClick={(e) => HandleNav(e, "appoint")} >View Appointments</div>

      <div className="col" value="medical" onClick={(e) => HandleNav(e, "medical") }>View Medical History</div>
    </div>

    <div className="row">
      <div className="col">{currentView}</div>
    </div>
  </div>
);
};

export default DentistHygienistView;
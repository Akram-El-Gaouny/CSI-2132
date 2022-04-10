import "./subViews.css";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../Contexts/UserContext";
import axios from "axios";

const History = () => {

    const user = useContext(UserContext);
    const [procedures, setProcedures] = useState([]);

    let uid = user.user.id;
    useEffect(() => {
        axios.get(`http://localhost:8000/appointmentProceduresByPatient?pid=${uid}`)
        .then((response) => {

            return response.data;
        })
        .then((data) => {
        
            setProcedures(data);
        })
        .catch((error) => {
            if (error.message === "Request failed with status code 400") {
                alert("Invalid Uid");

            } else {
                
                alert(error.message);
            }
        });
    }, [""]);

    const noProcedures = () => {
        return (
            <div className="text-center">
                You have no past proceduress...
            </div>
        );
    }

    
    
    const renderHistory = (procedure) => {
        return (
            <div className="row">
                <div className="col">
                    {procedure.procedureID}
                </div>
                <div className="col">
                    {procedure.appointmentType}
                </div>
                <div className="col">
                    {procedure.date.substring(0,10)}
                </div>
                <div className="col">
                    {procedure.medicationName}
                </div>
                <div className="col">
                    {procedure.comment}
                </div>
            </div>
        );
      }

  return ( 
    <div className="History subViewOutline m-5 ">
      <div className="row m-5 ">
        <div className="col subViewTitle text-center">History</div>
      </div>

      <div className="container">
        <div className="row">
            <div className="col">
                ProcedureID:
            </div>
            <div className="col">
                Appointment Type:
            </div>
            <div className="col">
                Date:
            </div>
            <div className="col">
                Medication:
            </div>
            <div className="col">
                Comment:
            </div>
        </div>
        {procedures === undefined || procedures.length === 0 ? noProcedures() : procedures.map(renderHistory)}
      </div>
      
    </div>
  );
};

export default History;
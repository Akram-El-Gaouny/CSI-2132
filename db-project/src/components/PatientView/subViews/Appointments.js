import "./subViews.css";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../Contexts/UserContext";
import axios from "axios";

const Appointments = () => {

    const user = useContext(UserContext);
    const [appointments, setAppointments] = useState([]);

    let uid = user.user.id;
    useEffect(() => {
        axios.get(`http://localhost:8000/appointmentsByPatient?patientID=${uid}`)
        .then((response) => {

            return response.data.queryResults;
        })
        .then((data) => {
        
            setAppointments(data);
        })
        .catch((error) => {
            if (error.message === "Request failed with status code 400") {
                alert("Invalid Uid");

            } else {
                
                alert(error.message);
            }
        });
    }, [""]);

    const noAppointments = () => {
        return (
            <div className="text-center">
                You have no upcoming appointments...
            </div>
        );
    }


  const renderAppointment = (appointment) => {
    return (
        <div className="row">
            <div className="col">
                {appointment.date.substring(0,10)}
            </div>
            <div className="col">
                {appointment.appointmentType}
            </div>
            <div className="col">
                {appointment.employeeID}
            </div>
            <div className="col">
                {appointment.startTime}
            </div>
            <div className="col">
                {appointment.endTime}
            </div>
        </div>
    );
  }

  return (
    <div className="Appointments subViewOutline m-5 ">
      <div className="row m-5 ">
        <div className="col subViewTitle text-center">Appointments</div>
      </div>

      <div className="container">
      <div className="row">
        <div className="col">
                Date:
            </div>
            <div className="col">
                Type:
            </div>
            <div className="col">
                Dentist ID:
            </div>
            <div className="col">
                Start Time:
            </div>
            <div className="col">
                End Time:
            </div>
        </div>
        {appointments === undefined || appointments.length === 0 ? noAppointments() : appointments.map(renderAppointment)}
      </div>
      
    </div>
  );
};

export default Appointments;
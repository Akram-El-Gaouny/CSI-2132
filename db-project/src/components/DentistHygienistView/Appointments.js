import "./subTabs.css";

const Appointments = (appointments) => {
    appointments = [
        {date: "Date1",
        type: "type1",
        patient: "name1",
        startTime: "start1",
        endTime: "end1"
        },
        {date: "Date2",
        type: "type2",
        patient: "name2",
        startTime: "start2",
        endTime: "end2"
        },
        {date: "Date3",
        type: "type3",
        patient: "name3",
        startTime: "start3",
        endTime: "end3"
        },
        {date: "Date4",
        type: "type4",
        patient: "name4",
        startTime: "start4",
        endTime: "end4"
        }
    ]

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
                {appointment.date}
            </div>
            <div className="col">
                {appointment.type}
            </div>
            <div className="col">
                {appointment.patient}
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
                Patient:
            </div>
            <div className="col">
                Start Time:
            </div>
            <div className="col">
                End Time:
            </div>
        </div>
        {appointments.length === 0 ? noAppointments() : appointments.map(renderAppointment)}
      </div>
      
    </div>
  );
};

export default Appointments;

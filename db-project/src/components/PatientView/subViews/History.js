import "./subViews.css";

const History = (appointments) => {

    appointments = [
        {date: "Date1",
        type: "type1",
        dentist: "name1",
        status: "completed",
        totalCost: "cost",
        insuranceCost: "insurance"
        },
        {date: "Date2",
        type: "type2",
        dentist: "name2",
        status: "completed",
        totalCost: "cost",
        insuranceCost: "insurance"
        },
        {date: "Date3",
        type: "type3",
        dentist: "name3",
        status: "completed",
        totalCost: "cost",
        insuranceCost: "insurance"
        },
        {date: "Date4",
        type: "type4",
        dentist: "name4",
        status: "completed",
        totalCost: "cost",
        insuranceCost: "insurance"
        }
    ]

    const noAppointments = () => {
        return (
            <div className="text-center">
                You have no past appointments...
            </div>
        );
    }

    const renderHistory = (appointment) => {
        return (
            <div className="row">
                <div className="col">
                    {appointment.date}
                </div>
                <div className="col">
                    {appointment.type}
                </div>
                <div className="col">
                    {appointment.dentist}
                </div>
                <div className="col">
                    {appointment.status}
                </div>
                <div className="col">
                    {appointment.totalCost}
                </div>
                <div className="col">
                    {appointment.insuranceCost}
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
                Date:
            </div>
            <div className="col">
                Type:
            </div>
            <div className="col">
                Dentist:
            </div>
            <div className="col">
                Status:
            </div>
            <div className="col">
                Total Cost:
            </div>
            <div className="col">
                Insurance Cost:
            </div>
        </div>
        {appointments.length === 0 ? noAppointments() : appointments.map(renderHistory)}
      </div>
      
    </div>
  );
};

export default History;
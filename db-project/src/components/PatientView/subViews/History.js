import "./subViews.css";

const History = (procedures) => {

    procedures = [
        {procedureID: "procedureID1",
        date: "date1",
        medication: "medication",
        comment: "comment"
        },
        {procedureID: "procedureID2",
        date: "date2",
        medication: "medication",
        comment: "comment"
        },
        {procedureID: "procedureID3",
        date: "date3",
        medication: "medication",
        comment: "comment"
        },
        {procedureID: "procedureID4",
        date: "date4",
        medication: "medication",
        comment: "comment"
        }
    ]

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
                    {procedure.date}
                </div>
                <div className="col">
                    {procedure.medication}
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
                procedureID:
            </div>
            <div className="col">
                date:
            </div>
            <div className="col">
                Medication:
            </div>
            <div className="col">
                Comment:
            </div>
        </div>
        {procedures.length === 0 ? noProcedures() : procedures.map(renderHistory)}
      </div>
      
    </div>
  );
};

export default History;
import "./subTabs.css";

const MedicalHistory = (procedures) => {
  procedures = [
    {date: "Date1",
    type: "type1",
    dentist: "name1",
    symptoms: "symptoms",
    medication: "medication",
    comment: "comment"
    },
    {date: "Date2",
    type: "type2",
    dentist: "name2",
    symptoms: "symptoms",
    medication: "medication",
    comment: "comment"
    },
    {date: "Date3",
    type: "type3",
    dentist: "name3",
    symptoms: "symptoms",
    medication: "medication",
    comment: "comment"
    },
    {date: "Date4",
    type: "type4",
    dentist: "name4",
    symptoms: "symptoms",
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
                {procedure.date}
            </div>
            <div className="col">
                {procedure.type}
            </div>
            <div className="col">
                {procedure.dentist}
            </div>
            <div className="col">
                {procedure.symptoms}
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
            Date:
        </div>
        <div className="col">
            Type:
        </div>
        <div className="col">
            Dentist:
        </div>
        <div className="col">
            Symptoms:
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
  

export default MedicalHistory;

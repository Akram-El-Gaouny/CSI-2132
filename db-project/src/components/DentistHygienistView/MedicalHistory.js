import "./subTabs.css";
import { useState } from "react";
import axios from "axios";

const MedicalHistory = () => {

    const [searchSSN, setSearchSSN] = useState();

    const [procedures, setProcedures] = useState([]);
 
	function handleSearch() {
		axios
			.get(`http://localhost:8000/patientbySSN?SSN=${searchSSN}`)
			.then((response) => {
                let uid = response.data.user.userID;
                if(uid !== undefined){
                    axios
                        .get(`http://localhost:8000/appointmentProceduresByPatient?pid=${uid}`)
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
                }
			})
			.catch((error) => {
				if (error.message === "Request failed with status code 400") {
					alert("Enter a valid Patient SSN");

                setProcedures([]);
				} else {
                   
					alert(error.message);
				}
			});
        
	}

    const noProcedures = () => {
        return (
            <div className="text-center">
                Search for a patient to see their history
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

      <div className='form-group row m-5'>
				<label className='col-6 col-form-label'>
					Please Enter the SSN of the Patient
				</label>
				<div className='col-5'>
					<input
						onChange={(e) => setSearchSSN(e.target.value)}
						type='text'
						className='form-control'
						required='required'
					/>
				</div>
				<button
					name='submit'
					type='submit'
					className='btn btn-primary'
					onClick={() => handleSearch()}>
					Search
				</button>
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
  

export default MedicalHistory;

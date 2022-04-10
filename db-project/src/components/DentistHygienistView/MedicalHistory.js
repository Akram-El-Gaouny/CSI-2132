import "./subTabs.css";
import { useState } from "react";
import axios from "axios";

const MedicalHistory = (procedures) => {
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

    const [searchSSN, setSearchSSN] = useState();
	const [searchData, setSearchData] = useState();

	const [first, setFirst] = useState("");
	const [last, setLast] = useState("");
	const [middle, setMiddle] = useState("");
	const [email, setEmail] = useState("");
	const [houseNumber, setHouseNumber] = useState("");
	const [street, setStreet] = useState("");
	const [city, setCity] = useState("");
	const [province, setProvince] = useState("Alberta");
	const [insurance, setInsurance] = useState("");
 
	function handleSearch() {
		axios
			.get(`http://localhost:8000/patientbySSN?SSN=${searchSSN}`)
			.then((response) => {
				return response.data.user;
			})
			.then((data) => {
        setSearchData(data);
				setFirst(data.first);
				setLast(data.last);
				setMiddle(data.middle);
				setEmail(data.email);
				setHouseNumber(data.houseNumber);
				setStreet(data.street);
				setCity(data.city);
				setProvince(data.province);
        setInsurance(data.insuranceProvider);
			})
			.catch((error) => {
				if (error.message === "Request failed with status code 400") {
					alert("Enter a valid Patient SSN");
          setSearchData();
				} else {
					alert(error.message);
				}
			});

	}

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
  

export default MedicalHistory;

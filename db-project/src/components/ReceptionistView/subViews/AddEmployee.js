import "./subViews.css";
import axios from "axios";
import { useEffect, useState } from "react";

let user = {
	first: null,
	middle: null,
	last: null,
	email: null,
	password: "dcms123",
	housenumber: null,
	street: null,
	city: null,
	province: null,
	role: "employee",
	dateOfBirth: null,
    position: "dentist",
	SSN: null,
	phonenumbers: [],
	salary: null,
    branch: 1,
};

const AddEmployee = () => {
	const [branchSelect, setBranchSelect] = useState([]);
	useEffect(() => {
	
		axios
			.get("http://localhost:8000/branches")
			.then((res) => {
				return res.data;
			})
			.then((data) => {
				setBranchSelect( data.map( branch => (<option key={branch.branchID} value= {branch.branchID}>  {branch.houseNumber + " " + branch.street + ", " + branch.city} </option> )));
                user.branch = data[0].branchID;
                
			})
			.catch((err) => {
				alert(err);
				console.log(err);
			});
	}, []);

	function handleSubmit(e) {
		e.preventDefault();
		let AddPatientInfo = `http://localhost:8000/addUser?fname=${user.first}&mname=${user.middle}&lname=${user.last}&pemail=${user.email}&pass=${user.password}&hnum=${user.housenumber}&str=${user.street}&cty=${user.city}&prov=${user.province}&role=${user.role}&dob=${user.dateOfBirth}&pssn=${user.SSN}`;

       alert(AddPatientInfo);

		axios
			.post(AddPatientInfo)
			.then((response) => {
				let uid = response.data.uid;

				if (uid !== undefined) {
					let AddEmployee = `http://localhost:8000/addEmployeeInformation?uid=${uid}&position=${user.position}&branch=${user.branch}&salary=${user.salary}`;
					axios.post(AddEmployee).catch((err) => {
						alert(err.message);
						return;
					});

					let AddPhone = `http://localhost:8000/addPhone?uid=${uid}&pnums=${user.phonenumbers}`;
					axios.post(AddPhone).catch((err) => {
						alert(err.message);
						return;
					});

					alert("Successfully added!");
				}
			})
			.catch((err) => {
				alert(err.message);
				return;
			});
	}


if (branchSelect !== "Loading..."){
	return (

		<div className='AddEmployee subViewOutline m-5 '>
			<div>
				<div className='row m-5 '>
					<div className='col subViewTitle text-center'>Add Employee</div>
				</div>

				<form className='m-5' onSubmit={(e) => handleSubmit(e)}>
					<div className='row mt-5 mb-5 bold'>
						<div className='col subtitle '>Employee Information</div>
					</div>

					<div className='form-group row'>
						<label className='col-6 col-form-label'>First Name</label>
						<div className='col-6'>
							<input
								onChange={(e) => (user.first = e.target.value)}
								type='text'
								className='form-control'
								required='required'
							/>
						</div>
					</div>
					<div className='form-group row'>
						<label className='col-6 col-form-label'>Middle Name</label>
						<div className='col-6'>
							<input
								onChange={(e) => (user.middle = e.target.value)}
								className='form-control'
							/>
						</div>
					</div>
					<div className='form-group row'>
						<label className='col-6 col-form-label'>Last Name</label>
						<div className='col-6'>
							<input
								onChange={(e) => (user.last = e.target.value)}
								className='form-control'
								required='required'
							/>
						</div>
					</div>

					<div className='form-group row'>
						<label className='col-6 col-form-label'>SSN</label>
						<div className='col-6'>
							<input
								onChange={(e) => (user.SSN = e.target.value)}
								type='number'
								className='form-control'
								min='0'
								max='999999999'
								required='required'
							/>
						</div>
					</div>

					<div className='form-group row'>
						<label className='col-6 col-form-label'>Email</label>
						<div className='col-6'>
							<input
								onChange={(e) => (user.email = e.target.value)}
								type='email'
								className='form-control'
								required='required'
							/>
						</div>
					</div>

					<div className='form-group row'>
						<label className='col-6 col-form-label'>
							Phone numbers (seperate by a comma)
						</label>
						<div className='col-6'>
							<input
								onChange={(e) =>
									(user.phonenumbers = e.target.value.split(","))
								}
								type='text'
								className='form-control'
								required='required'
							/>
						</div>
					</div>

					<div className='form-group row'>
						<label className='col-6 col-form-label'>Date of Birth</label>
						<div className='col-6'>
							<input
								onChange={(e) => (user.dateOfBirth = e.target.value)}
								type='date'
								className='form-control'
								required='required'
							/>
						</div>
					</div>

					<div className='form-group row'>
						<label className='col-6 col-form-label'>Position</label>
						<div className='col-6'>
							<select
								id='select'
								name='select'
								className='custom-select'
								required='required'
								onChange={(e) => (user.position = e.target.value)}>
								<option value='dentist'>Dentist</option>
								<option value='manager'>Manager</option>
								<option value='hygienist'>Hygenist</option>
								<option value='receptionist'>Receptionist</option>
							</select>
						</div>
					</div>

                    <div className='form-group row'>
						<label className='col-6 col-form-label'>Branch</label>
						<div className='col-6'>
							<select
								id='select'
								name='select'
								className='custom-select'
								required='required'
								onChange={(e) => (user.branch = e.target.value)}>
								{branchSelect} 
							</select>
						</div>
					</div>

					<div className='form-group row'>
						<label className='col-6 col-form-label'>Salary</label>
						<div className='col-6'>
							<input
								onChange={(e) => (user.salary = e.target.value)}
								type='text'
								className='form-control'
							/>
						</div>
					</div>

					<div className='row mt-5 mb-5 bold'>
						<div className='col subtitle '>Employee Address</div>
					</div>

					<div className='form-group row'>
						<label className='col-6 col-form-label'>House Number</label>
						<div className='col-6'>
							<input
								onChange={(e) => (user.housenumber = e.target.value)}
								type='number'
								className='form-control'
								required='required'
								min='1'
							/>
						</div>
					</div>
					<div className='form-group row'>
						<label className='col-6 col-form-label'>Street</label>
						<div className='col-6'>
							<input
								onChange={(e) => (user.street = e.target.value)}
								className='form-control'
								required='required'
							/>
						</div>
					</div>
					<div className='form-group row'>
						<label className='col-6 col-form-label'>City</label>
						<div className='col-6'>
							<input
								onChange={(e) => (user.city = e.target.value)}
								className='form-control'
								required='required'
							/>
						</div>
					</div>
					<div className='form-group row'>
						<label className='col-6 col-form-label'>Province</label>
						<div className='col-6'>
							<select
								id='select'
								name='select'
								className='custom-select'
								required='required'
								onChange={(e) => (user.province = e.target.value)}>
								<option value='Alberta'>Alberta</option>
								<option value='British Columbia'>British Columbia</option>
								<option value='Manitoba'>Manitoba</option>
								<option value='New Brunswick'>New Brunswick</option>
								<option value='Newfoundland and Labrador'>
									Newfoundland and Labrador
								</option>
								<option value='Northwest Territories'>
									Northwest Territories
								</option>
								<option value='Nova Scotia'>Nova Scotia</option>
								<option value='Nunavut'>Nunavut</option>
								<option value='Ontario'>Ontario</option>
								<option value='Prince Edward Island'>
									Prince Edward Island
								</option>
								<option value='Quebec'>Quebec</option>
								<option value='Saskatchewan'>Saskatchewan</option>
								<option value='Yukon'>Yukon</option>
							</select>
						</div>
					</div>

					<div className='form-group row'>
						<div className='offset-6 col-6'>
							<button name='submit' type='submit' className='btn btn-primary'>
								Add Employee
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}else{
    return (
        <div className='AddEmployee'>
            Loading...
        </div>
    )
}
};

export default AddEmployee;

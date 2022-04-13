import "./subViews.css";
import { useState } from "react";
import axios from "axios";

const Editpatient = () => {
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

	function handleSubmit(e) {
		e.preventDefault();
		document.getElementById("myform").reset();
		
		let updateUserInfo = `http://localhost:8000/updatePatient?fname=${first}&mname=${middle}&lname=${last}&email=${email}&hnum=${houseNumber}&str=${street}&cty=${city}&prov=${province}&SSN=${searchSSN}`;
		axios
			.put(updateUserInfo)
			.then((response) => {
				return response.data;
			})
			.then((data) => {
				if (data.message === "updates to patient info is successful") {
					axios.put(
            `http://localhost:8000/updatePatientInsurance?insurance=${insurance}&uid=${searchData.userID}`
          ).then((response) => {
            return response.data;
          }).then((data) => {
            if (data.message === "updates to insurance info is successful") {
              alert("Updated")
            }
          })
				}
			})
			.catch((err) => {
				alert(err.message);
			});
	}

	return (
		<div className='Editpatient subViewOutline m-5 '>
    
			<div className='row m-5 '>
				<div className='col subViewTitle text-center'>Edit Patient</div>
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

		  {	searchData !== undefined ? <form id = "myform" className='m-5' onSubmit={(e) => handleSubmit(e)}>
				<div className='row mt-5 mb-5 bold'>
					<div className='col subtitle '>Patient Information</div>
				</div>

				<div className='form-group row'>
					<label className='col-6 col-form-label'>First Name</label>
					<div className='col-6'>
						<input
							onChange={(e) => {
								setFirst(e.target.value);
							}}
							type='text'
							className='form-control'
							required='required'
							value={first}
						/>
					</div>
				</div>
				<div className='form-group row'>
					<label className='col-6 col-form-label'>Middle Name</label>
					<div className='col-6'>
						<input
							onChange={(e) => {
								setMiddle(e.target.value);
							}}
							className='form-control'
							value={middle}
						/>
					</div>
				</div>
				<div className='form-group row'>
					<label className='col-6 col-form-label'>Last Name</label>
					<div className='col-6'>
						<input
							onChange={(e) => {
								setLast(e.target.value);
							}}
							className='form-control'
							required='required'
							value={last}
						/>
					</div>
				</div>

				<div className='form-group row'>
					<label className='col-6 col-form-label'>Email</label>
					<div className='col-6'>
						<input
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							type='text'
							className='form-control'
							required='required'
							value={email}
						/>
					</div>
				</div>

				<div className='form-group row'>
					<label className='col-6 col-form-label'>Insurance Provider</label>
					<div className='col-6'>
						<input
							onChange={(e) => {
								setInsurance(e.target.value);
							}}
							type='text'
							className='form-control'
							required='required'
              value={insurance}

						/>
					</div>
				</div>

				<div className='row mt-5 mb-5 bold'>
					<div className='col subtitle '>Patient Address</div>
				</div>

				<div className='form-group row'>
					<label className='col-6 col-form-label'>House Number</label>
					<div className='col-6'>
						<input
							onChange={(e) => {
								setHouseNumber(e.target.value);
							}}
							type='number'
							className='form-control'
							required='required'
							min='1'
							value={houseNumber}
						/>
					</div>
				</div>
				<div className='form-group row'>
					<label className='col-6 col-form-label'>Street</label>
					<div className='col-6'>
						<input
							onChange={(e) => {
								setStreet(e.target.value);
							}}
							className='form-control'
							required='required'
							value={street}
						/>
					</div>
				</div>
				<div className='form-group row'>
					<label className='col-6 col-form-label'>City</label>
					<div className='col-6'>
						<input
							onChange={(e) => {
								setCity(e.target.value);
							}}
							className='form-control'
							required='required'
							value={city}
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
							onChange={(e) => {
								setProvince(e.target.value);
							}}
							value={province}>
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
							<option value='Prince Edward Island'>Prince Edward Island</option>
							<option value='Quebec'>Quebec</option>
							<option value='Saskatchewan'>Saskatchewan</option>
							<option value='Yukon'>Yukon</option>
						</select>
					</div>
				</div>

				<div className='form-group row'>
					<div className='offset-6 col-6'>
						<button name='submit' type='submit' className='btn btn-primary'>
							Confirm Changes
						</button>
					</div>
				</div>
			</form>  : "" }
		</div>
	);
};

export default Editpatient;

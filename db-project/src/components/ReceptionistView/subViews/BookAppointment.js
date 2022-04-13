import "./subViews.css";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

let apt = {};

const BookAppointment = () => {
	const [selectedBranch, setSelectedBranch] = useState("");
	const [selectedDentist, setSelectedDentist] = useState("");
	const [selectedType, setSelectedType] = useState("");
	const [branchSelect, setBranchSelect] = useState([""]);
	const [dentists, setDentists] = useState([""]);
	const [types, setTypes] = useState([""]);
	useEffect(() => {
		axios
			.get("http://localhost:8000/branches")
			.then((res) => {
				return res.data;
			})
			.then((data) => {
				setBranchSelect(
					data.map((branch) => (
						<option key={branch.branchID} value={branch.branchID}>
							{" "}
							{branch.houseNumber +
								" " +
								branch.street +
								", " +
								branch.city}{" "}
						</option>
					))
				);
				setSelectedBranch(data[0].branchID);
			})
			.catch((err) => {
				alert(err);
				console.log(err);
			});

		axios
			.get("http://localhost:8000/feeDescriptions")
			.then((res) => {
				return res.data.queryResults;
			})
			.then((data) => {
				setTypes(
					data.map((type) => (
						<option key={type.feeDesc} value={type.feeDesc}>
							{type.feeDesc}
						</option>
					))
				);
				setSelectedType(data[0].feeDesc);
			})
			.catch((err) => {
				alert(err);
				console.log(err);
			});
	}, []);

	useEffect(() => {
		if (selectedBranch != "") {
			axios
				.get(
					`http://localhost:8000/dentistsInBranch?branchid=${selectedBranch}`
				)
				.then((res) => {
					return res.data.queryResults;
				})
				.then((data) => {
					
                   if (data !== undefined)  {
					setDentists(
						data.map((doctor) => (
                            
							<option key={doctor.userID} value={doctor.userID}>
								{doctor.first + " " + doctor.last}
							</option>
						))
					);
					setSelectedDentist(data[0].userID);
				   }

				})
				.catch((err) => {
					alert(err);
					console.log(err);
				});
		}
	}, [selectedBranch]);

	const [searchSSN, setSearchSSN] = useState();
	const [searchData, setSearchData] = useState();

	const [date, setDate] = useState();
	const [startTime, setStart] = useState("8:00");
	const [endTime, setEnd] = useState();

	function handleSearch() {
		
		axios
			.get(`http://localhost:8000/patientbySSN?SSN=${searchSSN}`)
			.then((response) => {
				return response.data.user;
			})
			.then((data) => {
				setSearchData(data);
			})
			.catch((error) => {
				if (error.message === "Request failed with status code 400") {
					alert("Enter a valid SSN");
				} else {
					alert(error.message);
				}
			});
	}

	function handleSubmit(e) {
		e.preventDefault();

		axios
			.post(
				`http://localhost:8000/bookApt?pid=${searchData.userID}&eid=${selectedDentist}&date=${date}&startTime=${startTime}&endTime=${endTime}&aptType=${selectedType}`
			)
			.then((response) => {
                console.log(response)
				if (response.status === 200) {
                    alert("Appointment Booked")
                }
			})
			.catch((error) => {
				if (error.message === "Request failed with status code 400") {
					alert("Enter a valid SSN");
				} else {
					alert(error.message);
				}
			});
	}

	return (
		<div className='BookAppointment subViewOutline m-5 '>
			<div>
				<div className='row m-5 '>
					<div className='col subViewTitle text-center'>Book Appointment</div>
				</div>

				<div className='form-group row m-5'>
					<label className='col-6 col-form-label'>Patient SSN</label>
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

				{searchData !== undefined ? (
					<form className='m-5' onSubmit={(e) => handleSubmit(e)}>
						<div className='row mt-5 mb-5 bold'>
							<div className='col subtitle '>Appointment Information</div>
						</div>

						<div className='form-group row m-5'>
							<label className='col-6 col-form-label'>Select a Branch</label>
							<div className='col-5'>
								<select
									id='select'
									name='select'
									className='custom-select'
									required='required'
									onChange={(e) => setSelectedBranch(e.target.value)}>
									{branchSelect}
								</select>
							</div>
						</div>

						<div className='form-group row m-5'>
							<label className='col-6 col-form-label'>Select a Dentist</label>
							<div className='col-5'>
								<select
									id='select'
									name='select'
									className='custom-select'
									required='required'
									onChange={(e) => setSelectedDentist(e.target.value)}>
									{dentists}
								</select>
							</div>
						</div>

						<div className='form-group row m-5'>
							<label className='col-6 col-form-label'>
								What is this appointment for
							</label>
							<div className='col-5'>
								<select
									id='select'
									name='select'
									className='custom-select'
									required='required'
									onChange={(e) => setSelectedType(e.target.value)}>
									{types}
								</select>
							</div>
						</div>

						<div className='form-group row m-5'>
							<label className='col-6 col-form-label'>Date</label>
							<div className='col-5'>
								<input
									type='date'
									onChange={(e) => {
										setDate(e.target.value);
									}}
									className='form-control'
									required='required'
									min={dayjs().add(1, "day").format("YYYY-MM-DD")}
								/>
							</div>
						</div>

						<div className='form-group row m-5'>
							<label className='col-6 col-form-label'>Start Time</label>
							<div className='col-5'>
								<input
									type='time'
									onChange={(e) => {
										setStart(e.target.value);
									}}
									className='form-control'
									required='required'
									min='8:00'
									max='21:00'
								/>
							</div>
						</div>
						<div className='form-group row m-5'>
							<label className='col-6 col-form-label'>End Time</label>
							<div className='col-5'>
								<input
									type='time'
									onChange={(e) => {
										setEnd(e.target.value);
									}}
									className='form-control'
									required='required'
									min={startTime}
									max='21:00'
								/>
							</div>
						</div>

						<div className='form-group row'>
							<div className='offset-6 col-6'>
								<button name='submit' type='submit' className='btn btn-primary'>
									Book Appointment
								</button>
							</div>
						</div>
					</form>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default BookAppointment;

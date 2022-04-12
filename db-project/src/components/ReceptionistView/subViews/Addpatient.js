import "./subViews.css";
import axios from "axios";
import dayjs from "dayjs"

let user = {
	first: null,
	middle: null,
	last: null,
	email: null,
	password: "dcms123",
	housenumber: null,
	street: null,
	city: null,
	province: "Alberta",
	role: "patient",
	dateOfBirth: null,
	SSN: null,
	phonenumbers: [],
	insuranceProvidor: null,
};

const Addpatient = () => {
	function validatePhs() {
		let x = true;
		user.phonenumbers.forEach((ph) => {
			if (ph.length != 10 || isNaN(ph)) {
				if (x) {
					x = false;
				}
			}
		});

		return x;
	}

	function handleSubmit(e) {

		if (!validatePhs()) {
			alert(
				"Please ensure that each phone number is 10 digits only and has no alphabet in it"
			);
			return;
		}

		let AddPatientInfo = `http://localhost:8000/addUser?fname=${user.first}&mname=${user.middle}&lname=${user.last}&pemail=${user.email}&pass=${user.password}&hnum=${user.housenumber}&str=${user.street}&cty=${user.city}&prov=${user.province}&role=${user.role}&dob=${user.dateOfBirth}&pssn=${user.SSN}`;

		axios
			.post(AddPatientInfo)
			.then((response) => {
				let uid = response.data.uid;

				if (uid !== undefined) {
					let AddInsurance = `http://localhost:8000/addPatientInsurance?uid=${uid}&ins=${user.insuranceProvidor}`;
					axios.post(AddInsurance).catch((err) => {
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

	return (
		<div className='Addpatient subViewOutline m-5 '>
			<div className='row m-5 '>
				<div className='col subViewTitle text-center'>Add Patient</div>
			</div>

			<form className='m-5' onSubmit={(e) => handleSubmit(e)}>
				<div className='row mt-5 mb-5 bold'>
					<div className='col subtitle '>Patient Information</div>
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
							onChange={(e) => (user.phonenumbers = e.target.value.split(","))}
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
              max = {dayjs().format("YYYY-MM-DD")}
						/>
					</div>
				</div>

				<div className='form-group row'>
					<label className='col-6 col-form-label'>Insurance Provider</label>
					<div className='col-6'>
						<input
							onChange={(e) => (user.insuranceProvidor = e.target.value)}
							type='text'
							className='form-control'
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
							Add Patient
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Addpatient;

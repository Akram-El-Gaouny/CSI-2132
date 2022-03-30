import "./subViews.css";

const Deletepatient = () => {
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
    role: "patient",
    dateOfBirth: null,
    SSN: null,
    phonenumbers: [],
    insuranceProvidor: null
  };

function handleSubmit(){

   user.date = user.date.getYear() + "-" + user.date.getMonth() + "-" + user.date.getDay();
   console.log(user)

  
}

  return (
    <div className="Deletepatient subViewOutline m-5 ">
      <div className="row m-5 ">
        <div className="col subViewTitle text-center">Delete Patient</div>
      </div>
      <div className="form-group row m-5">
        <label className="col-6 col-form-label">
          Please Enter the SSN of the Patient
        </label>
        <div className="col-5">
          <input
            onChange={(e) => (user.first = e.target.value)}
            type="text"
            className="form-control"
            required="required"
          />
        </div>
        <button name="submit" type="submit" className="btn btn-primary">
          Search
        </button>
      </div>

      <form className="m-5" onSubmit={() => handleSubmit()}>

      <div className="row mt-5 mb-5 bold">
          <div className="col subtitle ">Patient Information</div>
        </div>


        <div className="form-group row">
          <label className="col-6 col-form-label">First Name</label>
          <div className="col-6">

          </div>
        </div>
        <div className="form-group row">
          <label className="col-6 col-form-label">Middle Name</label>
          <div className="col-6">

          </div>
        </div>
        <div className="form-group row">
          <label className="col-6 col-form-label">Last Name</label>
          <div className="col-6">

          </div>
        </div>

        <div className="form-group row">
          <label className="col-6 col-form-label">SSN</label>
          <div className="col-6">

          </div>
        </div>

        <div className="form-group row">
          <label className="col-6 col-form-label">Email</label>
          <div className="col-6">

          </div>
        </div>

        <div className="form-group row">
          <label className="col-6 col-form-label">Phone numbers (seperate by a comma)</label>
          <div className="col-6">

          </div>
        </div>

        <div className="form-group row">
          <label className="col-6 col-form-label">Date of Birth</label>
          <div className="col-6">

          </div>
        </div>

        <div className="form-group row">
          <label className="col-6 col-form-label">Insurance Provider</label>
          <div className="col-6">

          </div>
        </div>

        <div className="row mt-5 mb-5 bold">
          <div className="col subtitle ">Patient Address</div>
        </div>

        <div className="form-group row">
          <label className="col-6 col-form-label">House Number</label>
          <div className="col-6">

          </div>
        </div>
        <div className="form-group row">
          <label className="col-6 col-form-label">Street</label>
          <div className="col-6">

          </div>
        </div>
        <div className="form-group row">
          <label className="col-6 col-form-label">City</label>
          <div className="col-6">

          </div>
        </div>
        <div className="form-group row">
          <label className="col-6 col-form-label">
            Province
          </label>
          <div className="col-6">

          </div>
        </div>

        <div className="form-group row">
          <div className="offset-6 col-6">
            <button name="submit" type="submit" className="btn btn-primary">
              Confirm Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Deletepatient;

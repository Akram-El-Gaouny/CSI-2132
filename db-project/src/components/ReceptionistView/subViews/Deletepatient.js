import axios from "axios";
import "./subViews.css";
import { useState } from "react";

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
    insuranceProvidor: null,
  };

  const [searchSSN ,setSearchSSN] =  useState();
  const [searchData,setSearchData] = useState();

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
        if (error.message === "Request failed with status code 400" ){
          alert("Enter a valid SSN");
        }else{
          alert(error.message);
        }
        
      });

  }

  function handleSubmit(e) {
    e.preventDefault();
    
      axios.delete(`http://localhost:8000/deletePatient?SSN=${searchSSN}`).then((response) => {
      if (response.status === 200){
        alert("Successfully deleted")
      }
         
    
      }).catch((error) => alert(error.message))
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
            onChange={(e) => (setSearchSSN(e.target.value))}
            type="text"
            className="form-control"
            required="required"
          />
        </div>
        <button
          name="submit"
          type="submit"
          className="btn btn-primary"
          onClick={() => handleSearch()}
        >
          Search
        </button>
      </div>

      {	searchData !== undefined ? <form className="m-5" onSubmit={(e) => handleSubmit(e)}>
        <div className="row mt-5 mb-5 bold">
          <div className="col subtitle ">Patient Information</div>
        </div>

        <div className="form-group row">
          <label className="col-6 col-form-label">First Name</label>
          {searchData !== undefined ?<div className="col-6">{searchData.first}</div>:""}
        </div>
        <div className="form-group row">
          <label className="col-6 col-form-label">Middle Name</label>
          {searchData !== undefined ?<div className="col-6">{searchData.middle}</div>:""}
        </div>
        <div className="form-group row">
          <label className="col-6 col-form-label">Last Name</label>
          {searchData !== undefined ?<div className="col-6">{searchData.last}</div>:""}
        </div>

        <div className="form-group row">
          <label className="col-6 col-form-label">SSN</label>
          {searchData !== undefined ?<div className="col-6">{searchData.ssn}</div>:""}
        </div>

        <div className="form-group row">
          <label className="col-6 col-form-label">Email</label>
          {searchData !== undefined ?<div className="col-6">{searchData.email}</div>:""}
        </div>

        <div className="form-group row">
          <label className="col-6 col-form-label">Date of Birth</label>
          {searchData !== undefined ?<div className="col-6">{
          searchData.dateOfBirth.slice(0, searchData.dateOfBirth.indexOf("T"))
          }</div>:""}
        </div>

        <div className="row mt-5 mb-5 bold">
          <div className="col subtitle ">Patient Address</div>
        </div>

        <div className="form-group row">
          <label className="col-6 col-form-label">House Number</label>
          {searchData !== undefined ?<div className="col-6">{searchData.houseNumber}</div>:""}
        </div>
        <div className="form-group row">
          <label className="col-6 col-form-label">Street</label>
          {searchData !== undefined ?<div className="col-6">{searchData.street}</div>:""}
        </div>
        <div className="form-group row">
          <label className="col-6 col-form-label">City</label>
          {searchData !== undefined ?<div className="col-6">{searchData.city}</div>:""}
        </div>
        <div className="form-group row">
          <label className="col-6 col-form-label">Province</label>
          {searchData !== undefined ?<div className="col-6">{searchData.province}</div>:""}
        </div>

        <div className="form-group row">
          <div className="offset-6 col-6">
            <button name="submit" type="submit" className="btn btn-primary">
              Confirm Delete
            </button>
          </div>
        </div>
      </form> : ""}
    </div>
  );
};

export default Deletepatient;

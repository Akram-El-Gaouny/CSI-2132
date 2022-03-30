import e from "express";
import { SqlConnection } from "../server.js";

export function authenticate(req, res) {
  let email,
    password,
    position = null;
  email = req.query.email;
  password = req.query.password;
  position = req.query.position;
  role = req.query.role;
  if (email === "" || password === "" || position === "" || role === "") {
    res.status(400).json({
      message: "Please make sure you have supplied an email address, password",
    });
    return;
  }

  let query = `SELECT userID, first, last, position
  FROM user JOIN employee AS E
  WHERE userID=employeeID and email = "${email}"and password ="${password}" and ( position = "${position}" OR role = "${role}");`;

  console.log("A request has been made to the /authenticate endpoint");
  SqlConnection.query(query, function (err, result, fields) {
    if (err) {
      res.status(500).json(err);
      console.error(err);
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ message: "No matches found" });
      return;
    }

    res.json({ queryResults: result });
  });
}

// req handler that returns a list of dentists
export function dentistsInBranch(req, res) {
  let branchid = req.query.branchid;

  if (branchid === null) {
    res.status(400).json({ message: "Please provide a branch id" });
    return;
  }

  let query = `
        SELECT first, last FROM User
        WHERE User.userID IN (
          SELECT employee.employeeID FROM Employee
          WHERE employee.position = "dentist" and branchID = "${branchid}"
        );
  
  `;

  console.log("A request has been made to /dentistsInBranch endpoint");

  SqlConnection.query(query, function (err, result, fields) {
    if (err) {
      res.status(500).json(err);
      console.error(
        "An error occurred at the dentistsInBranch endpoint,",
        "Error Code: " + err.code + ",",
        "Error Message: " + err.sqlMessage
      );
      return;
    }

    if (result.length === 0) {
      res.json({ message: "no matches found" });
      return;
    }

    res.json({ queryResults: result[0] });
  });
}

export function appointmentsByDentist(req, res) {
  let employeeID = null;
  employeeID = req.query.employeeID;

  if (employeeID == null) {
    res.status(400).json({ message: "Please provide a dentist id" });
    return;
  }

  let query = `
    SELECT * 
    FROM Appointment 
    WHERE employeeID = ${employeeID}
    `;

  SqlConnection.query(query, function (err, result, fields) {
    if (err) {
      res.status(500).json(err);
      console.error(
        "An error occurred at the appointmentByDentist endpoint,",
        "Error Code: " + err.code + ",",
        "Error Message: " + err.sqlMessage
      );
      return;
    }

    if (result.length === 0) {
      res.json({ message: "no matches found" });
      return;
    }

    res.json({
      queryResults: result,
      message: "Here are the appointment results",
    });
  });
}

export function appointmentsByPatient(req, res) {
  let patientID = null;
  patientID = req.query.patientID;

  if (patientID === null) {
    res.status(400).json({ message: "Please provide a branch id" });
    return;
  }

  let query = `
    SELECT * 
    FROM Appointment 
    WHERE patientID = ${patientID}
    `;

  SqlConnection.query(query, function (err, result, fields) {
    if (err) {
      res.status(500).json(err);
      console.error(
        "An error occurred at the appointmentByPatient endpoint,",
        "Error Code: " + err.code + ",",
        "Error Message: " + err.sqlMessage
      );
      return;
    }

    if (result.length === 0) {
      res.json({ message: "no matches found" });
      return;
    }

    res.json({
      queryResults: result,
      message: "Here are the appointment results",
    });
  });
}

export function feesDescriptions(req, res) {
  let query = `
    SELECT feeDesc 
    FROM FeeCharge 
    WHERE feecode != 94303; 
    `;

  SqlConnection.query(query, function (err, result, fields) {
    if (err) {
      res.status(500).json(err);
      console.error(
        "An error occurred at the feeDescriptions endpoint,",
        "Error Code: " + err.code + ",",
        "Error Message: " + err.sqlMessage
      );
      return;
    }

    if (result.length === 0) {
      res.json({ message: "no matches found" });
      return;
    }

    res.json({
      queryResults: result,
      message: "Here are the available results",
    });
  });
}

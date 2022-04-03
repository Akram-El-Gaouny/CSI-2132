import e from "express";
import { SqlConnection } from "../server.js";

export function authenticate(req, res) {
  let email,
    password,
    role,
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

export function addUser(req, res) {
  let fname, mname, lname, pemail, pass, hnum, str, cty, prov, role, dob, pssn = null;
  fname = req.query.fname;
  mname = req.query.mname;
  lname = req.query.lname;
  pemail = req.query.pemail;
  pass = req.query.pass;
  hnum = req.query.hnum;
  str = req.query.str;
  cty = req.query.cty;
  prov = req.query.prov;
  role = req.query.role;
  dob = req.query.dob;
  pssn = req.query.pssn;


  if (fname === null) {
      res.status(400).json({message: "Please provide a first name"});
      return;
  }
  
  if (lname === null) {
      res.status(400).json({message: "Please provide a last name"});
      return;
  }

  if (pemail === null) {
      res.status(400).json({message: "Please provide an email"});
      return;
  }

  if (pass === null) {
      res.status(400).json({message: "Please provide a password"});
      return;
  }

  if (hnum === null) {
      res.status(400).json({message: "Please provide a house number"});
      return;
  }

  if (str === null) {
      res.status(400).json({message: "Please provide a street name"});
      return;
  }

  if (cty === null) {
      res.status(400).json({message: "Please provide a city"});
      return;
  }

  if (prov === null) {
      res.status(400).json({message: "Please provide a province"});
      return;
  }

  if (role === null) {
    res.status(400).json({message: "Please provide a role"});
    return;
  }

  if (dob === null) {
      res.status(400).json({message: "Please provide a date of birth"});
      return;
  }

  if (pssn === null) {
      res.status(400).json({message: "Please provide a social security number"});
      return;
  }

  console.log("A request has been made to the /addUser endpoint");
  
  let query = `
      INSERT INTO User
      (first, middle, last, email, password, houseNumber, street, city, province, role, dateOfBirth, ssn) 
      VALUES 
      ("${fname}", "${mname}", "${lname}", "${pemail}", "${pass}", ${hnum}, "${str}", "${cty}", "${prov}", "${role}", "${dob}", ${pssn});
  `;

  SqlConnection.query(query, function (err, result, fields) {

  if (err) {
      res.status(500).json(err);
      console.error("An error occurred at the addUser endpoint,", "Error Code: " + err.code +",", "Error Message: " + err.sqlMessage);
      return;
  } else {
    console.log("A user has successfully been added to the DB");
    res.json( {uid: result.insertId} )
  }
  });
  
}

export function addPhone(req, res) {
  let uid, pnums = null;
  uid = req.query.uid;
  pnums = req.query.pnums;

  if (uid === null) {
      res.status(400).json({message: "Please provide a uid"});
      return;
  }

  console.log("A request has been made to the /addPhone endpoint");

  pnums.split(",").forEach(element => {
    let query2 = `
      INSERT INTO PhoneNumber
      (userId, phoneNumber) 
      VALUES 
      (${uid}, ${element});
    `;
    SqlConnection.query(query2, function (err, result, fields) {

      if (err) {
          res.status(500).json(err);
          console.error("An error occurred at the addPatient endpoint,", "Error Code: " + err.code +",", "Error Message: " + err.sqlMessage);
          return;
      } else {
        console.log("A phone number has successfully been added to the DB");
      }
      });
  });

  res.status(200);
  
}

export function addPatientInsurance(req, res) {
  let uid, ins = null;
  uid = req.query.uid;
  ins = req.query.ins;

  if (uid === null) {
      res.status(400).json({message: "Please provide a uid"});
      return;
  }

  console.log("A request has been made to the /addPatientInsurance endpoint");

  let query3 = (ins == null ? `
    INSERT INTO Patient
    (patientId, insuranceProvider) 
    VALUES 
    (${uid}, null);
  `
  : 
  `
    INSERT INTO Patient
    (patientId, insuranceProvider) 
    VALUES 
    (${uid}, "${ins}");
  `)
  SqlConnection.query(query3, function (err, result, fields) {

    if (err) {
        res.status(500).json(err);
        console.error("An error occurred at the addPatient endpoint,", "Error Code: " + err.code +",", "Error Message: " + err.sqlMessage);
        return;
    } else {
      console.log("A patient insurance provider has successfully been added to the DB");
    }
  });

  res.status(200);
  
}
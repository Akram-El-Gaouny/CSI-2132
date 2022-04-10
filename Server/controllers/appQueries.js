import e from "express";
import { SqlConnection } from "../server.js";

export function authenticatePatient(req, res) {
	let email,
		password,
		position = undefined;

	email = req.query.email;
	password = req.query.password;

	if (email === undefined || password === undefined) {
		res.status(400).json({
			message: "Please make sure you have supplied an email address, password",
		});
		return;
	}

	let query = `
  SELECT userID, first, last, role
  FROM user 
  WHERE email = "${email}"and password ="${password}" and role = "patient";`;

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

export function authenticateEmployee(req, res) {
	let email,
		password,
		position = undefined;

	email = req.query.email;
	password = req.query.password;
	position = req.query.position;

	if (email === undefined || password === undefined || position === undefined) {
		res.status(400).json({
			message: "Please make sure you have supplied an email address, password",
		});
		return;
	}

	let query = `
  SELECT userID, first, last, position
  FROM user AS u , employee AS E
  WHERE u.userID=e.employeeID and u.email = "${email}" and u.password ="${password}" and e.position = "${position}" and u.role = "employee";`;

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

	if (branchid === undefined) {
		res.status(400).json({ message: "Please provide a branch id" });
		return;
	}

	let query = `
        SELECT * FROM User
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

		res.json({ queryResults: result });
	});
}

export function appointmentsByDentist(req, res) {
	let employeeID = undefined;
	employeeID = req.query.employeeID;

	if (employeeID == undefined) {
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
	let patientID = undefined;

	patientID = req.query.patientID;

	if (patientID === undefined) {
		res.status(400).json({ message: "Please provide a patient id" });
		return;
	}

	let query = `
    SELECT * 
    FROM Appointment 
    WHERE patientID = ${patientID};
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
	let fname,
		mname,
		lname,
		pemail,
		pass,
		hnum,
		str,
		cty,
		prov,
		role,
		dob,
		pssn = undefined;
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

	if (fname === undefined) {
		res.status(400).json({ message: "Please provide a first name" });
		return;
	}

	if (lname === undefined) {
		res.status(400).json({ message: "Please provide a last name" });
		return;
	}

	if (pemail === undefined) {
		res.status(400).json({ message: "Please provide an email" });
		return;
	}

	if (pass === undefined) {
		res.status(400).json({ message: "Please provide a password" });
		return;
	}

	if (hnum === undefined) {
		res.status(400).json({ message: "Please provide a house number" });
		return;
	}

	if (str === undefined) {
		res.status(400).json({ message: "Please provide a street name" });
		return;
	}

	if (cty === undefined) {
		res.status(400).json({ message: "Please provide a city" });
		return;
	}

	if (prov === undefined) {
		res.status(400).json({ message: "Please provide a province" });
		return;
	}

	if (role === undefined) {
		res.status(400).json({ message: "Please provide a role" });
		return;
	}

	if (dob === undefined) {
		res.status(400).json({ message: "Please provide a date of birth" });
		return;
	}

	if (pssn === undefined) {
		res
			.status(400)
			.json({ message: "Please provide a social security number" });
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
			console.error(
				"An error occurred at the addUser endpoint,",
				"Error Code: " + err.code + ",",
				"Error Message: " + err.sqlMessage
			);
			return;
		} else {
			console.log("A user has successfully been added to the DB");
			res.json({ uid: result.insertId });

		}
	});
}

export function addPhone(req, res) {
	let uid,
		pnums = undefined;
	uid = req.query.uid;
	pnums = req.query.pnums;

	if (uid === undefined) {
		res.status(400).json({ message: "Please provide a uid" });
		return;
	}

	console.log("A request has been made to the /addPhone endpoint");

	pnums.split(",").forEach((element) => {
		let query2 = `
      INSERT INTO PhoneNumber
      (userId, phoneNumber) 
      VALUES 
      (${uid}, ${element});
    `;
		SqlConnection.query(query2, function (err, result, fields) {
			if (err) {
				res.status(500).json(err);
				console.error(
					"An error occurred at the addPhone endpoint,",
					"Error Code: " + err.code + ",",
					"Error Message: " + err.sqlMessage
				);
				return;
			} else {
				console.log("A phone number has successfully been added to the DB");
			}
		});
	});

	res.status(200);
}

export function addEmployeeInformation(req, res){

  let uid, salary, position, branch = undefined;

  uid = req.query.uid;
  salary = req.query.salary;
  position = req.query.position;
  branch = req.query.branch;
	
  if (uid === undefined) {
		res.status(400).json({ message: "Please provide a uid" });
		return;
	}

	if (salary === undefined) {
		res.status(400).json({ message: "Please provide a salary" });
		return;
	}

  
	if (position === undefined) {
		res.status(400).json({ message: "Please provide a position" });
		return;
	}

	if (branch === undefined) {
		res.status(400).json({ message: "Please provide a branch" });
		return;
	}

  let query = `INSERT into employee VALUES (${uid}, ${salary}, "${position}", ${branch})`;

  SqlConnection.query(query, function (err, result, fields) {
    if (err){
      res.status(500).json(err);
      console.error(
        "An error occurred at the addE endpoint,",
        "Error Code: " + err.code + ",",
        "Error Message: " + err.sqlMessage
      );
      return;
    }

    res.status(200);

  })

}

export function Branches(req, res){
  
  let query = "SELECT * FROM branch";

  SqlConnection.query(query, function(err, result, fields)  {

		if (err) {
			res.status(500).json(err);
			console.error(
				"An error occurred at the branches endpoint,",
				"Error Code: " + err.code + ",",
				"Error Message: " + err.sqlMessage
			)
      return
    }

    res.status(200).json(result);

  })

}


export function addPatientInsurance(req, res) {
	let uid,
		ins = undefined;
	uid = req.query.uid;
	ins = req.query.ins;

	if (uid === undefined) {
		res.status(400).json({ message: "Please provide a uid" });
		return;
	}

	console.log("A request has been made to the /addPatientInsurance endpoint");

	let query3 =
		ins == undefined
			? `
    INSERT INTO Patient
    (patientId, insuranceProvider) 
    VALUES 
    (${uid}, null);
  `
			: `
    INSERT INTO Patient
    (patientId, insuranceProvider) 
    VALUES 
    (${uid}, "${ins}");
  `;
	SqlConnection.query(query3, function (err, result, fields) {
		if (err) {
			res.status(500).json(err);
			console.error(
				"An error occurred at the addPatient endpoint,",
				"Error Code: " + err.code + ",",
				"Error Message: " + err.sqlMessage
			);
			return;
		} else {
			console.log(
				"A patient insurance provider has successfully been added to the DB"
			);
		}
	});

	res.status(200);
}

export function patientBySSN(req, res) {
	let SSN = req.query.SSN;

	let query = `
  SELECT * 
  FROM user, Patient
  WHERE SSN = "${SSN}" and role = "patient" and user.userID = Patient.patientID; 
  `;

	SqlConnection.query(query, function (err, result, fields) {
		if (err) {
			res.status(500).json(err);
			console.error(
				"An error occurred at the userBySSN endpoint,",
				"Error Code: " + err.code + ",",
				"Error Message: " + err.sqlMessage
			);
			return;
		}

		if (result.length === 0) {
			res.status(400).json({ message: "no matches found" });
			return;
		}

		res.status(200).json({
			user: result[0],
		});
	});
}

export function deletePatient(req, res) {
	let SSN = req.query.SSN;

	if (SSN === undefined) {
		res.status(400).json({ message: "Please provide an SSN" });
	}

	let query = `
    DELETE FROM user WHERE ssn="${SSN}" and role = "patient";
  `;

	SqlConnection.query(query, function (err, result, fields) {
		if (err) {
			res.status(500).json(err);
			console.error(
				"An error occurred at the deleteBySSN endpoint,",
				"Error Code: " + err.code + ",",
				"Error Message: " + err.sqlMessage
			);
			return;
		}

		if (result.length === 0) {
			res.status(400).json({ message: "no matches found" });
			return;
		}

		res.status(200);
	});
}

export function updatePatient(req, res) {
	let fname,
		mname,
		lname,
		hnum,
		str,
		cty,
		prov,
		email,
		SSN = undefined;

	fname = req.query.fname;
	mname = req.query.mname;
	lname = req.query.lname;
	hnum = req.query.hnum;
	str = req.query.str;
	cty = req.query.cty;
	prov = req.query.prov;
	email = req.query.email;
	SSN = req.query.SSN;

	if (fname === undefined) {
		res.status(400).json({ message: "Please provide a first name" });
		return;
	}

	if (SSN === undefined) {
		res.status(400).json({ message: "Please provide an SSN" });
		return;
	}

	if (lname === undefined) {
		res.status(400).json({ message: "Please provide a last name" });
		return;
	}

	if (email === undefined) {
		res.status(400).json({ message: "Please provide an email" });
		return;
	}

	if (hnum === undefined) {
		res.status(400).json({ message: "Please provide a house number" });
		return;
	}

	if (str === undefined) {
		res.status(400).json({ message: "Please provide a street name" });
		return;
	}

	if (cty === undefined) {
		res.status(400).json({ message: "Please provide a city" });
		return;
	}

	if (prov === undefined) {
		res.status(400).json({ message: "Please provide a province" });
		return;
	}

	console.log("A request has been made to the /updatePatient endpoint");

	let query = `
  UPDATE user
  SET 
  first = "${fname}",
  middle = "${mname}",
  last = "${lname}",
  houseNumber = ${hnum},
  street = "${str}",
  city = "${cty}",
  province = "${prov}",
  email = "${email}"
  WHERE 
  SSN = "${SSN}" and role = "patient";
  `;

	SqlConnection.query(query, function (err, result, fields) {
		if (err) {
			res.status(500).json(err);
			console.error(
				"An error occurred at the deleteBySSN endpoint,",
				"Error Code: " + err.code + ",",
				"Error Message: " + err.sqlMessage
			);
			return;
		}

		res.status(200).json({ message: "updates to patient info is successful" });
	});
}

export function updatePatientInsurance(req, res){

    let insurance = req.query.insurance;
    let uid = req.query.uid;

    let query = `UPDATE patient SET insuranceProvider = "${insurance}" WHERE patientID = ${uid}`

    SqlConnection.query(query, function (err, result, fields) {
      if (err) {
        res.status(500).json(err);
        console.error(
          "An error occurred at the updatePatientInsurance endpoint,",
          "Error Code: " + err.code + ",",
          "Error Message: " + err.sqlMessage
        );
        return;
      }

      res.status(200).json({ message: "updates to insurance info is successful" });
    });
}

export function phoneNumbersByUID(req, res){

  
  let uid = req.query.uid;

  let query = `SELECT phoneNumber from PhoneNumber where userID=${uid}`

  SqlConnection.query(query, function (err, result, fields) {
    if (err) {
      res.status(500).json(err);
      console.error(
        "An error occurred at the updatePatientInsurance endpoint,",
        "Error Code: " + err.code + ",",
        "Error Message: " + err.sqlMessage
      );
      return;
    }
    
    res.status(200).json(result);
  });
}

export function bookApt(req, res){
	let pid = req.query.pid 
	let eid = req.query.eid
	let date = req.query.date
	let startTime = req.query.startTime
	let endTime	= req.query.endTime
	let aptType = req.query.aptType
	

	let query = `
	INSERT INTO Appointment (patientID, employeeID, date, startTime, endTime, appointmentType)
	VALUES (${pid}, ${eid}, "${date}", "${startTime}", "${endTime}", "${aptType}");
	`
	SqlConnection.query(query, function (err, result, fields){
		if (err) {
			res.status(500).json(err);
			console.error(
			  "An error occurred at the bookApt. endpoint,",
			  "Error Code: " + err.code + ",",
			  "Error Message: " + err.sqlMessage
			);
			return;
		  }
		  
		  res.status(200).json({"aptid": result.insertId});
	})


}

export function appointmentProceduresByPatient(req, res) {
	let pid = req.query.pid;

	let query = `
	SELECT x.procedureID, x.date, t.comment, m.medicationName, x.appointmentType FROM 
	(SELECT procedureID, a.date, a.appointmentType FROM
	(SELECT appointmentID, date, appointmentType FROM Appointment
	WHERE patientID = ${pid}) a
	JOIN AppointmentProcedure AS p ON a.appointmentID = p.appointmentID) x
	JOIN Treatment AS t ON x.procedureID=t.procedureID
	JOIN Medication AS m ON m.procedureID=t.procedureID 
	`
	 SqlConnection.query(query, function (err, result, fields) {
		 if (err) {
			 res.status(500).json(err);
			 console.error(
				"An error occurred at the appointmentProceduresByPatient endpoint,",
				"Error Code: " + err.code + ",",
				"Error Message: " + err.sqlMessage
			 );
			 return;
		 }

		 res.status(200).json(result)
	 })
}
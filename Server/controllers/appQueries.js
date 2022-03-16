import { SqlConnection } from "../server.js";

export function test(req, res) {
  let query = `SELECT * FROM users;`;

  console.log("A request has been made to the /test endpoint");
  SqlConnection.query(query, function (err, result, fields) {
    if (err) {
      res.status(500).json(err);
      console.error(err);
      return;
    }

    if (result.length === 0) {
      res.json({ message: "no matches found" });
      return;
    }

    res.json({ queryResults: result });
  });
}

// req handler that returns a list of dentists
export function dentistsInBranch(req, res) {
  let branchid = req.query.branchid;
  if (branchid === null) {
    res.status(400).json({message: "Please provide a branch id"});
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
      console.error("An error occurred at the dentistsInBranch endpoint,", "Error Code: " + err.code +",", "Error Message: " + err.sqlMessage);
      return;
    }

    if (result.length === 0) {
      res.json({ message: "no matches found" });
      return;
    }

    res.json({ queryResults: result });
  });

}

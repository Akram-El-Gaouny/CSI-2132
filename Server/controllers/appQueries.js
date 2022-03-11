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

    res.json({"queryResults": result});

  });
}

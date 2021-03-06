import express from 'express';
import {health} from "../controllers/healthController.js";
import {bookApt, addEmployeeInformation, Branches,updatePatientInsurance,updatePatient,deletePatient,patientBySSN ,authenticatePatient,authenticateEmployee, dentistsInBranch, appointmentsByDentist, appointmentsByPatient, feesDescriptions, addUser, addPhone, addPatientInsurance, appointmentProceduresByPatient} from "../controllers/appQueries.js";
const Router = express.Router();

// get requests
Router.get("/health", health);
Router.get("/authenticateEmployee", authenticateEmployee);
Router.get("/authenticatePatient", authenticatePatient);
Router.get("/dentistsInBranch", dentistsInBranch)
Router.get("/appointmentsByDentist", appointmentsByDentist)
Router.get("/appointmentsByPatient", appointmentsByPatient)
Router.get("/feeDescriptions", feesDescriptions)
Router.get("/patientBySSN",patientBySSN)
Router.get("/branches",Branches)
Router.get("/appointmentProceduresByPatient", appointmentProceduresByPatient)

Router.post("/addUser", addUser)
Router.post("/addPhone", addPhone)
Router.post("/addEmployeeInformation", addEmployeeInformation)
Router.post("/addPatientInsurance", addPatientInsurance)
Router.post("/bookApt", bookApt)

Router.delete("/deletePatient", deletePatient)

Router.put("/updatePatient", updatePatient)
Router.put("/updatePatientInsurance", updatePatientInsurance)

export default Router;
import express from 'express';
import {health} from "../controllers/healthController.js";
import {authenticatePatient,authenticateEmployee, dentistsInBranch, appointmentsByDentist, appointmentsByPatient, feesDescriptions, addUser, addPhone, addPatientInsurance} from "../controllers/appQueries.js";
const Router = express.Router();

// get requests
Router.get("/health", health);
Router.get("/authenticateEmployee", authenticateEmployee);
Router.get("/authenticatePatient", authenticatePatient);
Router.get("/dentistsInBranch", dentistsInBranch)
Router.get("/appointmentsByDentist", appointmentsByDentist)
Router.get("/appointmentsByPatient", appointmentsByPatient)
Router.get("/feeDescriptions", feesDescriptions)
Router.get("/addUser", addUser)
Router.put("/addPhone", addPhone)
Router.put("/addPatientInsurance", addPatientInsurance)

export default Router;
import express from 'express';
import {health} from "../controllers/healthController.js";
import {authenticate, dentistsInBranch, appointmentsByDentist, appointmentsByPatient, feesDescriptions} from "../controllers/appQueries.js";
const Router = express.Router();

// get requests
Router.get("/health", health);
Router.get("/authenticate", authenticate);
Router.get("/dentistsInBranch", dentistsInBranch)
Router.get("/appointmentsByDentist", appointmentsByDentist)
Router.get("/appointmentsByPatient", appointmentsByPatient)
Router.get("/feeDescriptions", feesDescriptions)
export default Router;
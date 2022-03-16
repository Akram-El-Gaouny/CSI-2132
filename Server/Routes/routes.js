import express from 'express';
import {health} from "../controllers/healthController.js";
import {test, dentistsInBranch} from "../controllers/appQueries.js";
const Router = express.Router();

// get requests
Router.get("/health", health);
Router.get("/test", test);
Router.get("/dentistsInBranch", dentistsInBranch)

export default Router;
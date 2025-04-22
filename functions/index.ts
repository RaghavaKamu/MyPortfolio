//import * as functions from "firebase-functions";
import express from "express";
import { registerRoutes } from "../server/routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register API routes
registerRoutes(app);

// Export the Express app as a Firebase Function named "api"
//export const api = functions.https.onRequest(app);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import * as functions from "firebase-functions";
const express_1 = __importDefault(require("express"));
const routes_1 = require("../server/routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Register API routes
(0, routes_1.registerRoutes)(app);
// Export the Express app as a Firebase Function named "api"
//export const api = functions.https.onRequest(app);

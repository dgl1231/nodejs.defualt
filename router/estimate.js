import express from "express";
import database from "../config/db.js";

const router = express.Router();
const conn = database;


export default router;
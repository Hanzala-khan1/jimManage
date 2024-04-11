const { createUpdateAttendence, getAttendance, JimActiveUser } = require("../controller/Attendence.controller");
const { verifyToken } = require("../utils/varifyToken");

const Router = require("express").Router();

Router.post("/addUpdateAttendence",verifyToken, createUpdateAttendence);
Router.get("/getAttendence",verifyToken, getAttendance);
Router.get("/getActiveUser",verifyToken, JimActiveUser);

module.exports = Router;
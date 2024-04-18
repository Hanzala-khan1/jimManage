const { monthEarnings, getuserDashBoardData } = require("../controller/expenses.controller.js");
const { verifyToken } = require("../utils/varifyToken.js");
const Router = require("express").Router();

Router.get("/getEarninDetail", verifyToken, monthEarnings);
Router.get("/getDashboardDetails", verifyToken, getuserDashBoardData);


module.exports = Router;
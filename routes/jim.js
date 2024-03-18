const controller = require("../controller/Jim");
const { verifyToken } = require("../utils/varifyToken.js");
const Router = require("express").Router();

Router.post("/addJim",verifyToken, controller.addBusinessLocation);
Router.get("/getAllBusinessLocation",verifyToken, controller.getAllBusinessLocation);
Router.get("/getOneLocation/:id",verifyToken, controller.getOneBusinessLocation);
Router.delete("/deleteLocation/:id",verifyToken, controller.deleteLocation);
Router.put("/updateLocation/:id",verifyToken, controller.updateaBusinessLocation);

module.exports = Router;
const controller = require("../controller/user.js");
const { verifyToken } = require("../utils/varifyToken.js");
const Router = require("express").Router();

Router.post("/addUser", controller.addUser);
Router.post("/loginUser", controller.login);
Router.get("/getAllBusinessUser",verifyToken, controller.getAllByBusinessLocation);
Router.get("/getOne/:id", controller.getOne);
Router.delete("/deleteUser/:id",verifyToken, controller.deleteUser);
Router.put("/updateUser/:id",verifyToken, controller.updateUser);
Router.put("/updatePassword/:id", controller.updatePassword);
// Router.put("/updateImage/:id", controller.updateImage);

module.exports = Router;
const controller = require("../controller/user.js");
// const { upload } = require("../middleware/multer.js");
const Router = require("express").Router();

Router.post("/addUser", controller.addUser);
Router.post("/loginUser", controller.login);
Router.get("/getAll", controller.getAll);
Router.get("/getOne/:id", controller.getOne);
Router.delete("/deleteUser/:id", controller.deleteUser);
Router.put("/updateUser/:id", controller.updateUser);
Router.put("/updatePassword/:id", controller.updatePassword);
// Router.put("/updateImage/:id", controller.updateImage);

module.exports = Router;
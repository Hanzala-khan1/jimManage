const { addContactQuery, getContactQuery } = require("../controller/contactQuery.controller");

const Router = require("express").Router();

Router.post("/addContactQuery", addContactQuery);
Router.get("/removeContactQuery", getContactQuery);
module.exports = Router;
const express = require("express");
const router = express.Router();
const controller = require("../controllers/message.controller");

//Route for create new message
router.post("/", controller.createMessage);

//Route for retrieve all the messages
router.get("/", controller.viewAllMessages);

//Route for cehck all the messages
router.post("/check", controller.checkMessage);

module.exports = router;

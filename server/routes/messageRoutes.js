const express = require("express");
const { newMessage, getMessages } = require("../controllers/messageController");

const ROLES_LIST = require("../config/rolesList");
const verifyJwt = require("../middleware/verifyJwt");
const verifyRoles = require("../middleware/verifyRoles");

const router = express.Router();

router.route("/newMessage").post(verifyJwt, newMessage);
router.route("/messages/:chatId").get(verifyJwt, getMessages);

module.exports = router;
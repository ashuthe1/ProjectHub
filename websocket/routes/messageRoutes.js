const express = require("express");
const { newMessage, getMessages } = require("../controllers/messageController");

const ROLES_LIST = require("../../server/config/rolesList");
const verifyJwt = require("../../server/middleware/verifyJwt");
const verifyRoles = require("../../server/middleware/verifyRoles");

const router = express.Router();

router.route("/newMessage").post(verifyJwt, newMessage);
router.route("/messages/:chatId").get(verifyJwt, getMessages);

module.exports = router;
const express = require('express');
const { newChat, getChats } = require('../controllers/chatController');

const ROLES_LIST = require("../../server/config/rolesList");
const verifyJwt = require("../../server/middleware/verifyJwt");
const verifyRoles = require("../../server/middleware/verifyRoles");

const router = express.Router();

router.route("/newChat").post(verifyJwt, newChat);
router.route("/chats").get(verifyJwt, getChats);

module.exports = router;
const express = require('express');
const { newChat, getChats } = require('../controllers/chatController');

const ROLES_LIST = require("../config/rolesList");
const verifyJwt = require("../middleware/verifyJwt");
const verifyRoles = require("../middleware/verifyRoles");

const router = express.Router();

router.route("/newChat").post(verifyJwt, newChat);
router.route("/chats").get(verifyJwt, getChats);

module.exports = router;
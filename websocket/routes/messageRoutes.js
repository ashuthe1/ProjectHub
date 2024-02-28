const express = require("express");
const router = express.Router();

const verifyJwt = require("../middlewares/verifyJwt");
const { getMessages, sendMessage, getConversations } = require("../controllers/messageController");

router.route("/conversations") 
    .get(getConversations);
router.route("/:otherUserId")
    .get(verifyJwt, getMessages);
router.route("/")
    .post(verifyJwt, sendMessage);

module.exports = router;

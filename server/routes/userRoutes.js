const express = require("express");
const {
  getAllUsers,
  followUser,
  updateUser,
  disableUser,
} = require("../controllers/userController");
const ROLES_LIST = require("../config/rolesList");
const verifyJwt = require("../middleware/verifyJwt");
const verifyRoles = require("../middleware/verifyRoles");
const isCached = require("../middleware/isCached");

const router = express.Router();

router.route("/").get(isCached, getAllUsers);

router
  .route("/:id")
  .put(
    [
      verifyJwt,
      verifyRoles(ROLES_LIST.BasicUser, ROLES_LIST.ProUser, ROLES_LIST.Admin),
    ],
    updateUser
  );

router.route("/follow/:id")
  .patch(verifyJwt, followUser);

router
  .route("/disable/:id")
  .put([verifyJwt, verifyRoles(ROLES_LIST.Admin)], disableUser);

module.exports = router;

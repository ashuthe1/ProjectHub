const express = require("express");
const {
  getAllProjects,
  getFeaturedProjects,
  getProject,
  addProject,
  updateProject,
  rateProject,
  deleteProject,
  addComment,
  deleteComment,
  toggleFavoriteProject,
} = require("../controllers/projectController");
const ROLES_LIST = require("../config/rolesList");
const verifyJwt = require("../middleware/verifyJwt");
const verifyRoles = require("../middleware/verifyRoles");
const router = express.Router();
const isCached = require("../middleware/isCached");

router
  .route("/")
  .get(isCached, getAllProjects)
  .post(
    [verifyJwt, verifyRoles(ROLES_LIST.BasicUser, ROLES_LIST.Admin, ROLES_LIST.ProUser)],
    addProject
  );

router.route("/featured").get(isCached, getFeaturedProjects);

router
  .route("/rate/:id")
  .put(
    [
      verifyJwt,
      verifyRoles(ROLES_LIST.BasicUser, ROLES_LIST.ProUser, ROLES_LIST.Admin),
    ],
    rateProject
  );

router
  .route("/:id")
  .get(isCached, getProject)
  .put(
    [verifyJwt, verifyRoles(ROLES_LIST.BasicUser, ROLES_LIST.Admin, ROLES_LIST.ProUser)],
    updateProject
  )
  .delete(
    [verifyJwt, verifyRoles(ROLES_LIST.BasicUser, ROLES_LIST.Admin, ROLES_LIST.ProUser)],
    deleteProject
  );

router
  .route("/comment/:id")
  .put(
    [
      verifyJwt,
      verifyRoles(ROLES_LIST.BasicUser, ROLES_LIST.ProUser, ROLES_LIST.Admin),
    ],
    addComment
  );

router
  .route("/comment/:projectId/:commentId")
  .delete(
    [
      verifyJwt,
      verifyRoles(ROLES_LIST.BasicUser, ROLES_LIST.ProUser, ROLES_LIST.Admin),
    ],
    deleteComment
  );

router
  .route("/favorite/:id")
  .put(
    [
      verifyJwt,
      verifyRoles(ROLES_LIST.BasicUser, ROLES_LIST.ProUser, ROLES_LIST.Admin),
    ],
    toggleFavoriteProject
  );

module.exports = router;

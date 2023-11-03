const express = require("express");
const user = require("../controllers/userController");
const session = require("../controllers/sessionConntroller");
const { requireUser } = require("../middleware/requireUser");

exports.getPaths = () => {
  const router = express.Router();

  router.post(
    "/api/register",
    user.registerWithPassword,
    session.createNewSession
  );
  router.post("/api/login", user.loginWithPassword, session.getSessionHandler);
  router.get("/api/me", requireUser, user.getCurrentUser);
  router.get(
    "/api/users/oauth/google",
    user.registerWithGoogle,
    session.createNewSession
  );
  router.get(
    "/api/login/oauth/google",
    user.loginWithGoogle,
    session.getSessionHandler
  );
  router.post("/api/logout", requireUser, session.invalidateSession);

  return router;
};

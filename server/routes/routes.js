const express = require("express");
const user = require("../controllers/userController");
const session = require("../controllers/sessionConntroller");
const article = require("../controllers/articleController");
const articlenote = require("../controllers/userArticleNotesController");
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

  router.get(
    "/api/user/bookmarks",
    requireUser,
    articlenote.getAllUsersBookmarks
  );
  router.get(
    "/api/user/allannotations",
    requireUser,
    articlenote.getAllUsersAnnotations
  );

  router.get("/api/article", requireUser, article.getArticle);

  router.get("/api/articlenote", requireUser, articlenote.getArticleNotes);

  router.get(
    "/api/articleannotation",
    requireUser,
    articlenote.getArticleAnnotations
  );
  router.patch(
    "/api/articleannotation/:id",
    requireUser,
    articlenote.updateAnnotation
  );
  router.delete(
    "/api/articleannotation/:id",
    requireUser,
    articlenote.deleteAnnotation
  );

  router.put("/api/articlenote", requireUser, articlenote.addNote);

  router.put("/api/articlenote/bookmark", requireUser, articlenote.bookmark);
  router.put("/api/articlenote/unmark", requireUser, articlenote.unmark);

  return router;
};

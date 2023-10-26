exports.requireUser = (req, res, next) => {
  if (!req.body.email) return res.status(403).send("Invalid session");
  return next();
};

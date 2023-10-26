const { verifyJwt } = require("../utils/jwt.utils");
const { reIssueAccessToken } = require("../controllers/sessionConntroller");

const deserializeUser = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken && !refreshToken) return next();

  let jwt;

  if (accessToken) jwt = verifyJwt(accessToken);

  if (jwt?.decoded) {
    res.locals.user = jwt?.decoded;
    return next();
  }

  if ((jwt?.expired && refreshToken) || (!accessToken && refreshToken)) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });
    const result = verifyJwt(newAccessToken);

    res.locals.user = result.decoded;
    res.cookie("accessToken", newAccessToken, {
      maxAge: 900000,
      httpOnly: false,
      domain: "localhost",
      path: "/",
      sameSite: "lax",
      secure: false,
    });
  }
  return next();
};
module.exports = { deserializeUser };

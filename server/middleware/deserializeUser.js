const { verifyJwt } = require('../utils/jwt.utils')
const { reIssueAccessToken } = require('../controllers/sessionConntroller')

exports.deserializeUser = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies

  if (!accessToken && !refreshToken) return next()

  let jwt

  if (accessToken) jwt = verifyJwt(accessToken)

  if (jwt && !jwt.expired && jwt.valid) {
    const decodedUser = jwt?.decoded
    if (decodedUser) {
      res.locals.user = {
        id: decodedUser.session,
        email: decodedUser.email
      }
      return next()
    }
  }

  if ((jwt?.expired && refreshToken) || (!accessToken && refreshToken)) {
    const newAccessToken = await reIssueAccessToken({ refreshToken })
    if (!newAccessToken) return next()
    const result = verifyJwt(newAccessToken)

    res.locals.user = {
      id: result.decoded?.session,
      email: result.decoded?.email
    }
    res.cookie('accessToken', newAccessToken, {
      maxAge: 900000,
      domain: process.env.NODE_ENV === 'development' ? 'localhost' : 'szczpanczyk.tech',
      sameSite: 'none',
      secure: true,
      partitioned: true,
      httpOnly: true
    })
  }

  return next()
}

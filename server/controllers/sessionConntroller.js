const jwt = require('jsonwebtoken')
const { get } = require('lodash')
const { verifyJwt, signJwt } = require('../utils/jwt.utils.js')
const db = require('../database/db')
const Session = require('../models/sessionModel')(db.sequelize, db.Sequelize)

const accessTokenCookieOptions = {
  maxAge: 900000,
  httpOnly: false,
  domain: '.onrender.com',
  path: '/',
  sameSite: 'none',
  secure: true
}

const refreshTokenCookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10
}

const createSession = async (data) => {
  try {
    const newSession = await Session.create({ ...data, valid: true })
    return newSession.toJSON()
  } catch (e) {
    console.log(e)
  }
}

const findSession = async (query) => await Session.findOne(query)
const updateSession = async (update, query) => await Session.update(update, query)

exports.reIssueAccessToken = async ({ refreshToken }) => {
  const { decoded } = verifyJwt(refreshToken)

  if (!decoded) return false

  const session = await Session.findByPk(decoded.session)

  if (!session || !session.valid) return false

  const accessToken = signJwt(
    { email: session.userEmail, session: session.id },
    { expiresIn: process.env.ACCESS_TOKEN_TTL }
  )

  return accessToken
}

exports.createNewSession = async (req, res) => {
  const { id, email } = res.locals.user
  console.log(res.locals.user, 'createNewSession localcs user')
  let session = await findSession({
    where: { userEmail: res.locals.user.email }
  })

  if (!session) {
    session = await createSession({
      userId: id,
      userEmail: email,
      userAgent: req.get('user-agent') || ''
    })
  }

  const accessToken = signJwt(
    { email, session: session.id },
    { expiresIn: process.env.ACCESS_TOKEN_TTL }
  )

  const refreshToken = signJwt(
    { email, session: session.id },
    { expiresIn: process.env.REFRESH_TOKEN_TTL }
  )
  console.log(accessToken, refreshToken)
  res.cookie('accessToken', accessToken, accessTokenCookieOptions)
  res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions)

  return res.locals.provider === 'google'
    ? res.redirect(308, `${process.env.REACT_APP_SERVER_URL}/articles`)
    : res.status(200).send({ message: 'success' })
}

exports.getSessionHandler = async (req, res) => {
  const session = await findSession({
    where: { userEmail: res.locals.user.email }
  })
  const refreshToken = signJwt(
    { email: session.userEmail, session: session.id },
    { expiresIn: process.env.REFRESH_TOKEN_TTL }
  )
  const accessToken = signJwt(
    { email: session.userEmail, session: session.id },
    { expiresIn: process.env.ACCESS_TOKEN_TTL }
  )

  res.cookie('accessToken', accessToken, accessTokenCookieOptions)
  res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions)

  return res.locals.provider === 'google'
    ? res.redirect(308, `${process.env.REACT_APP_SERVER_URL}/articles`)
    : res.status(200).send({ message: 'success' })
}

exports.invalidateSession = async (req, res) => {
  const { email } = req.body
  await updateSession({ valid: false }, { where: { userEmail: email } })

  res.cookie('accessToken', null, { maxAge: 0, httpOnly: true })
  res.cookie('refreshToken', null, { maxAge: 0, httpOnly: true })

  return res.status(200).send('Logged out')
}

//unused yet
exports.deleteSession = async (req, res) => {
  const { email } = req.body

  await updateSession({ id: sessionId }, { valid: false })

  return res.send({
    accessToken: null,
    refreshToken: null
  })
}

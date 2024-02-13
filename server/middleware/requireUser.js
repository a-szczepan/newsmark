function requireUser(req, res, next) {
  const user = res?.locals?.user
  console.log(res.locals, 'require user res locals')
  if (!user) {
    return res.sendStatus(403)
  }

  return next()
}

module.exports = { requireUser }

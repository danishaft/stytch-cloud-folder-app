const passport = require('passport')

//middleware using passport

const authenticate = (req, res, next) => {
    passport.authenticate('stytch', { session: false }, (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res
                .status(401)
                .json({ error: info.message || 'Unauthorized' })
        }
        req.user = user
        next()
    })(req, res, next)
}

module.exports = authenticate

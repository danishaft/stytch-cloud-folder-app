// const stytchClient = require('../utils/stytch.config')

//middleware for authenticating a user
// const authenticate = async (req, res, next) => {
//         const sessionToken = req.cookies.stytch_session
//         if (!sessionToken) {
//             return res.status(401).json({error: 'No session token provided'})
//         }
//         try {
//             const response = await stytchClient.sessions.authenticate({  session_token: sessionToken })
//             if (response.session_token) {
//                 next();
//             } else {
//                 throw new Error("Unauthorized");
//             }
//         } catch (error) {
//             console.error('Stytch API Error:', error)
//             if (error.response) {
//                 console.error('Response:', error.response.data)
//             }
//             res.status(error.status_code || 401).json({
//                 error: error.error_type || 'Invalid or expired session',
//                 message:
//                     error.message || 'An error occurred during authentication',
//             })
//         }
    
// }

const passport = require('passport');

//middleware using passport

const authenticate = (req, res, next) => {
    passport.authenticate("stytch", {session: false}, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ error: info.message || 'Unauthorized' });
        }
        req.user = user;
        next();
    })(req, res, next);
};

module.exports = authenticate
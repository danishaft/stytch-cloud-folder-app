const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 4000

// Middleware
app.use(cors({ origin: true, credentials: true }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

const StytchStrategy = require('./utils/passport.config')

// Passport configuration
passport.use(new StytchStrategy())
app.use(passport.initialize())

const usersRoute = require('./routes/users')
const foldersRoute = require('./routes/folders')

// Routes
app.use('/api/users', usersRoute)
app.use('/api/folders', foldersRoute)

// Start the server
app.listen(port, (err) => {
    if (err) throw err
    console.log(`Server is running on port ${port}`)
})

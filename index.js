const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieSession = require('cookie-session')
const passport = require('passport')
const { mongoURL, cookieKey } = require('./config/keys')
require('./database/models/user')
require('./services/passport')
const app = express()

// enable cors
app.use(cors())

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [cookieKey]
}))

app.use(passport.initialize())
app.use(passport.session())



mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connect success to database 👍');
  })
  .catch(err => console.log(`Failed to connect to database ${err} 👎`))

require('./routes/authRoutes')(app)


const PORT = process.env.PORT || 5000

app.listen(PORT)
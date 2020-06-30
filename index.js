const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieSession = require('cookie-session')
const passport = require('passport')
const { mongoURL, cookieKey } = require('./config/keys')
require('./database/models/user')
require('./database/models/survey')
require('./services/passport')
const app = express()

// enable cors
app.use(cors())

// body parser
app.use(express.json())

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

// handle Routes
require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)
require('./routes/surveysRoutes')(app)

// handle production development
if (process.env.NODE_ENV === 'production') {
  // express will serve production assets
  app.use(express.static('client/build'))

  // express will serve index.html if doesnt recognize route
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


const PORT = process.env.PORT || 5000

app.listen(PORT)
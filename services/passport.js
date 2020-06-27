const passport = require('passport')
const User = require('../database/models/user')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { googleClientID, googleClientSecret } = require('../config/keys')

// generate token
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  if (user) {
    done(null, user)  // req.user
  }
})

passport.use(new GoogleStrategy({
  clientID: googleClientID,
  clientSecret: googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({ googleId: profile.id })
    if (existingUser) {
      done(null, existingUser)
    } else {
      const newUser = await new User({ googleId: profile.id }).save()
      done(null, newUser)
    }
  } catch (error) {
    console.log('error', error)
  }
}))



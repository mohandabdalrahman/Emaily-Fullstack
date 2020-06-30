const { stripeSecretKey } = require('../config/keys')
const stripe = require('stripe')(stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin')
module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    try {
      const charge = await stripe.charges.create(
        {
          amount: 500,
          currency: 'usd',
          source: req.body.id,
          description: 'My First Test Charge (created for API docs)',
        }
      );
      req.user.credits += 5
      const user = await req.user.save()
      res.send(user)
    } catch (error) {
      console.log('error on charging', error)
    }

  })
}
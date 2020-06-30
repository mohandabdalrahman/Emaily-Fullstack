const Survey = require('../database/models/survey')
const requireCredits = require('../middlewares/requireCredits')
module.exports = app => {
  app.post('/api/surveys', requireCredits, async (req, res) => {
    const { title, body, subject, recipients } = req.body
    await Survey.create({
      title,
      body,
      subject,
      recipients: recipients.split(',').map(email => ({ email })),
      _user: req.body.id,
      dateSend: Date.now()
    })
  })
}
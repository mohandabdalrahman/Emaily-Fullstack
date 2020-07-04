const Survey = require('../database/models/survey')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailyTemplates/surveyTemplate')
const _ = require('lodash')
const { Path } = require('path-parser')
const { URL } = require('url')
const Survey = require('../database/models/survey')
module.exports = app => {
  app.post('/api/surveys', requireCredits, async (req, res) => {
    const { title, body, subject, recipients } = req.body
    const survey = new Survey({
      title,
      body,
      subject,
      recipients: recipients.split(',').map(email => ({ email })),
      _user: req.body.id,
      dateSend: Date.now()
    })
    const mailer = new Mailer(survey, surveyTemplate(survey))
    try {
      await mailer.send()
      await survey.save()
      req.user.credits -= 1
      const user = await req.user.save()
      res.send(user)
    } catch (error) {
      console.log('Error on sendindg email:', error)
    }
  })

  app.get('/api/surveys/:surveyID/:choice', (req, res) => {
    res.send('Thanks for your voting')
  })

  app.post('/api/surveys/webhooks', (req, res) => {
    const path = new Path('/api/surveys/:surveyID/:choice')
    const events = req.body.map(({ url, email }) => {
      const match = path.test(new URL(url).pathname)
      if (match) {
        return {
          ...match,
          email
        }
      }
    }).filter(event => event)

    _.uniqBy(events, 'email', 'surveyId').forEach(({ surveyId, email, choice }) => {
      Survey.updateOne({
        _id: surveyId,
        recipients: {
          $elemMatch: {
            email,
            responded: false
          }
        }
      }, {
        $inc: { [choice]: 1 },
        $set: { 'recipients.$.responded': false },
        lastResponded: new Date()
      }).exec()
    })
  })
}
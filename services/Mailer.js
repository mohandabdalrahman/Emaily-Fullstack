const sendGrid = require('sendgrid')
const { sendGridKey } = require('../config/keys')
const helper = sendGrid.mail

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super()
    this.sgApi = sendGrid(sendGridKey)
    this.email_from = new helper.Email('no-reply@emaily.com')
    this.subject = subject
    this.body = new helper.Content('text/html', content)
    this.recipients = this.formatAddress(recipients)

    // from Mail class
    this.addContent(this.body)
    this.addClickTracking()
    this.addRecipients()
  }

  formatAddress(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email)
    })
  }

  addClickTracking() {
    const trackSettings = new helper.TrackingSettings()
    const clickTracking = new helper.ClickTracking(true, true)
    trackSettings.setClickTracking(clickTracking)
    this.addTrackingSettings(trackSettings)
  }

  addRecipients() {
    const personalize = new helper.Personalization()
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient)
    })
    this.addPersonalization(personalize)
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    })

    return await this.sgApi.API(request)
  }
}
const sendGrid = require('sendgrid')
const { sendGridKey } = require('../config/keys')
const helper = sendGrid.mail

class Mailer extends helper.Mail {

}
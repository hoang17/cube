const program = require('commander')
const csv = require('csv')
const fs = require('fs')
const chalk = require('chalk')
const async = require('async')
const inquirer = require('inquirer')
const dotenv = require('dotenv')
const nodemailer = require('nodemailer')

dotenv.load({ path: '.env' })

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'duhuandemo@gmail.com',
    pass: 'Demo123123'
  }
})

let sendViaMailer = function(to, from, subject, callback){
  let mailOptions = {
    from: '"Du Huan Super" <duhuandemo@gmail.com>',
    to: `"${to.name}" <${to.email}>`,
    subject: subject,
    text: 'Hello from node commander',
    html: '<b>Hello from node commander</b>'
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  })
}

program
  .version('0.0.1')
  .option('-l, --list [list]', 'List of customers in CSV')
  .parse(process.argv)

let questions = [
  {
    type : "input",
    name : "sender.email",
    message : "Sender's email address - ",
    default: "duhuandemo@gmail.com"
  },
  {
    type : "input",
    name : "sender.name",
    message : "Sender's name - ",
    default: "Lê Huy Hoàng"
  },
  {
    type : "input",
    name : "subject",
    message : "Subject - ",
    default: "Test from sendgrid cli T.T"
  }
];
let contactList = [];
let parse = csv.parse;
let stream = fs.createReadStream(program.list)
    .pipe(parse({ delimiter : "," }))


let sendEmail = function (to, from, subject, callback) {

  let template = "Wishing you a Merry Christmas and a " + "prosperous year ahead. P.S. Toby, I hate you."
  let helper = require('sendgrid').mail
  let fromEmail = new helper.Email(from.email, from.name)
  let toEmail = new helper.Email(to.email, to.name)
  let body = new helper.Content("text/plain", template)
  let mail = new helper.Mail(fromEmail, subject, toEmail, body)

  let sg = require('sendgrid')(process.env.SENDGRID_API_KEY)
  let request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  })

  sg.API(request, function(error, response) {

    if (error) {
        console.log('Error response received');
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
        return callback(error)
    }
    callback()
  })
}

stream
  .on("error", function (err) {
    return console.error(err.response)
  })
  .on("data", function (data) {
    let name = data[0] + " " + data[1]
    let email = data[2]
    contactList.push({ name : name, email : email })
  })
  .on("end", function () {
    inquirer.prompt(questions).then(function (ans) {
      async.each(contactList, function (recipient, fn) {
        sendViaMailer(recipient, ans.sender, ans.subject, fn)
      }, function (err) {
        if (err) {
          return console.error(chalk.red(err.message))
        }
        console.log(chalk.green('Success'))
      })
    })
  })

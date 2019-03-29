const uuidv4 = require("uuid/v4");
const mail = require("@sendgrid/mail");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const log = console.log;
const API_KEY = process.env.API_KEY;

const htmlEmail = fs.readFileSync(path.resolve("index.html"), "utf8");

const message = {
  to: "email address",
  from: "email address",
  subject: `Test Email: ${uuidv4()}`,
  html: htmlEmail
};

mail.setApiKey(API_KEY);
log(chalk.blue(`📧   Sending test email`));
mail
  .send(message)
  .then(x => log(chalk.green(`📬   Test email successfully sent`)))
  .catch(err => {
    log(chalk.red(`Error: ${err.toString()}`));
  });

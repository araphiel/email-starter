const fs = require("fs");
const path = require("path");

const chalk = require("chalk");
const prompts = require("prompts");
const { error, log } = console;

const selectPrompt = async () => {
  const questions = [
    {
      type: "select",
      name: "template",
      message: `What kind of email are you creating?`,
      choices: [
        {
          title: "Skeleton Template",
          value: path.resolve("templates", "skeleton.mjml")
        }
      ],
      initial: 1
    },
    {
      type: () => (fs.existsSync("index.mjml") ? "confirm" : null),
      name: "overwrite",
      message: "Do you wish to overwrite the existing index.mjml file?",
      initial: false
    }
  ];

  const response = await prompts(questions);
  const { template, overwrite } = response;

  fs.copyFile(template, "index.mjml", overwrite ? 0 : 1, err => {
    if (err) {
      return error(
        chalk.bold.red(
          "Template file (index.mjml) not created - file already exist"
        )
      );
    }
    log(chalk.green("✅ - Template file (index.mjml) has been created!"));
  });
};

selectPrompt();

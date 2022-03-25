"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const fs = require("fs");
const path = require("path");
const { pascalCase } = require("pascal-case");

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to ${chalk.red(
          "generator-g-react"
        )} scene generator, follow the quick and easy configuration to create a new scene!`
      )
    );

    const answers = await this.prompt([
      {
        type: "input",
        name: "sceneName",
        message: "What is your scene name?"
      },
      {
        type: "confirm",
        name: "useHooks",
        message: "Would you like to create a separate hook file?",
        default: true
      }
    ]);

    if (answers.sceneName === "") {
      this.log(yosay(chalk.red("Please give your scene a name next time!")));
      process.exit(1);
      return;
    }

    answers.sceneName = pascalCase(answers.sceneName);
    this.answers = answers;
  }

  writing() {
    /**
     * Index.tsx scene file
     */

    this.fs.copyTpl(
      this.templatePath("index.ejs"),
      this.destinationPath(`./src/scenes/${this.answers.sceneName}/index.tsx`),
      {
        ...this.answers
      }
    );

    /**
     * Index.hooks.tsx hooks file
     */

    if (this.answers.useHooks) {
      this.fs.copyTpl(
        this.templatePath("index.hooks.ejs"),
        this.destinationPath(
          `./src/scenes/${this.answers.sceneName}/index.hooks.tsx`
        ),
        {
          ...this.answers
        }
      );
    }

    /**
     * /src/scenes/index.tsx export file
     */

    const content = `export * from './${this.answers.sceneName}';\n`;

    fs.appendFileSync(
      path.join(this.destinationRoot(), "src", "scenes", "index.tsx"),
      content
    );
  }
};

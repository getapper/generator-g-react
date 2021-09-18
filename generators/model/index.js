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
        )} model generator, follow the quick and easy configuration to create a new model!`
      )
    );

    const answers = await this.prompt([
      {
        type: "input",
        name: "modelName",
        message: "What is your model name?"
      }
    ]);

    if (answers.modelName === "") {
      this.log(yosay(chalk.red("Please give your model a name next time!")));
      process.exit(1);
      return;
    }

    answers.modelName = pascalCase(answers.modelName);
    this.answers = answers;
  }

  writing() {
    /**
     * Index.tsx model file
     */

    this.fs.copyTpl(
      this.templatePath("index.ejs"),
      this.destinationPath(`./src/models/${this.answers.modelName}/index.tsx`),
      {
        ...this.answers
      }
    );

    /**
     * /src/models/index.tsx export file
     */

    const content = `export * from './${this.answers.modelName}';\n`;

    fs.appendFileSync(
      path.join(this.destinationRoot(), "src", "models", "index.tsx"),
      content
    );
  }
};

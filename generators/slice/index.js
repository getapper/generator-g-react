"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const { pascalCase } = require("pascal-case");

module.exports = class extends Generator {
  async prompting() {
    this.log(
      yosay(
        `Welcome to ${chalk.red(
          "generator-g-react"
        )} redux slice generator, follow the quick and easy configuration to create a new slice!`
      )
    );

    const answers = await this.prompt([
      {
        type: "input",
        name: "sliceName",
        message: "What is your slice name?"
      },
      {
        type: "confirm",
        name: "useSagas",
        message: "Would you like to create a saga file?",
        default: true
      }
    ]);

    if (answers.sceneName === "") {
      this.log(yosay(chalk.red("Please give your slice a name next time!")));
      process.exit(1);
      return;
    }

    this.answers = answers;
  }

  writing() {
    const { useSagas, sliceName } = this.answers;
    const pCsliceName = pascalCase(sliceName);

    /**
     * Slice/index.tsx file
     */

    this.fs.copyTpl(
      this.templatePath("index.ejs"),
      this.destinationPath(`./src/redux-store/slices/${sliceName}/index.tsx`),
      {
        sliceName,
        pCsliceName,
        useSagas
      }
    );

    /**
     * Slice/interface/index.tsx file
     */

    this.fs.copyTpl(
      this.templatePath("interface.index.ejs"),
      this.destinationPath(
        `./src/redux-store/slices/${sliceName}/interfaces/index.tsx`
      ),
      {
        pCsliceName
      }
    );

    /**
     * Slice/selectors/index.tsx file
     */

    this.fs.copyTpl(
      this.templatePath("selectors.index.ejs"),
      this.destinationPath(
        `./src/redux-store/slices/${sliceName}/selectors/index.tsx`
      ),
      {
        sliceName,
        pCsliceName
      }
    );

    /**
     * Slice/sagas/index.tsx file
     */

    if (useSagas) {
      this.fs.copyTpl(
        this.templatePath("sagas.index.ejs"),
        this.destinationPath(
          `./src/redux-store/slices/${sliceName}/sagas/index.tsx`
        ),
        {
          sliceName
        }
      );
    }

    this.log(
      yosay(
        "Don't forget to add the new slice to your redux-store/slices/index.tsx file!"
      )
    );
  }
};

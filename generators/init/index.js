"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const fs = require("fs");
const path = require("path");

module.exports = class extends Generator {
  async prompting() {
    this.log(
      yosay(
        `Hi! Welcome to the official ${chalk.blue(
          "Getapper React Generator!"
        )}. ${chalk.red(
          "This command SHOULD only be executed right after CRA install, not sooner, not later!"
        )}\nAnd it will install Redux, Sagas, Persist, React-Router, MUI, and basic app templates.\nDon't forget to check TODOs and to delete App.* files inside src folder.`
      )
    );

    this.answers = await this.prompt([
      {
        type: "confirm",
        name: "accept",
        message: "Are you sure to proceed?"
      }
    ]);

    if (!this.answers.accept) {
      process.exit(0);
    }
  }

  writing() {
    /**
     * PACKAGE JSON
     */

    const pkgJson = {
      devDependencies: {
        "env-cmd": "10.1.0",
        husky: "4.2.5",
        "lint-staged": "10.2.11",
        prettier: "2.0.5"
      },
      dependencies: {
        "@hookform/resolvers": "1.3.5",
        "@material-ui/core": "4.11.0",
        "@material-ui/icons": "4.11.2",
        "@reduxjs/toolkit": "1.4.0",
        "@types/classnames": "2.2.10",
        "@types/react-redux": "7.1.9",
        "@types/react-router-dom": "^5.1.5",
        axios: "0.19.2",
        classnames: "2.2.6",
        "connected-react-router": "6.8.0",
        history: "4.10.1",
        "react-hook-form": "6.15.4",
        "react-redux": "7.2.0",
        "react-router-dom": "5.2.0",
        "redux-persist": "6.0.0",
        "redux-saga": "1.1.3",
        yup: "0.32.9"
      },
      scripts: {
        "start:backend:locale":
          "env-cmd -f .env.development_backend react-scripts start",
        "build:staging": "env-cmd -f .env.staging react-scripts build",
        "build:production": "env-cmd -f .env.production react-scripts build"
      },
      husky: {
        hooks: {
          "pre-commit": "lint-staged"
        }
      },
      "lint-staged": {
        "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": ["prettier --write"]
      }
    };

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);

    /**
     * TSCONFIG JSON
     */

    const tsConfigJson = this.fs.readJSON(
      this.destinationPath("tsconfig.json")
    );
    tsConfigJson.compilerOptions.baseUrl = "src";
    tsConfigJson.compilerOptions.strict = false;
    tsConfigJson.extends = "./custom-tsconfig.json";

    // Extend or create tsconfig.json file in destination path
    this.fs.write(
      this.destinationPath("tsconfig.json"),
      JSON.stringify(tsConfigJson, null, 2)
    );

    /**
     * GIT_IGNORE
     */

    var gitignoreFile = path.join(this.destinationRoot(), ".gitignore");
    var gitignoreFileExists = fs.existsSync(gitignoreFile);

    const content = "\n.idea\n.eslintcache\n";

    if (gitignoreFileExists) {
      fs.appendFileSync(gitignoreFile, content);
    } else {
      fs.writeFileSync(gitignoreFile, content);
    }

    /**
     * Copy all other files
     */
    this.fs.copy(this.templatePath("."), this.destinationPath("."));
    this.fs.copy(this.templatePath(".*"), this.destinationRoot());
  }

  install() {
    this.npmInstall();
  }
};

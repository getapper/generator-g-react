"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  async prompting() {
    this.log(
      yosay(
        `Hi! Welcome to the official ${chalk.blue(
          "Getapper React Generator!"
        )}. ${chalk.red(
          "This command will switch your web app into an Electron app!!!"
        )}`
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
        electron: "^14.0.0",
        "electron-builder": "^22.11.7"
      },
      scripts: {
        start:
          'concurrently "cross-env BROWSER=none npm run react:start" "wait-on http://localhost:3000 && electron ."',
        "react:start": "react-scripts start",
        "react:build": "react-scripts build",
        "react:test": "react-scripts test",
        "react:eject": "react-scripts eject",
        "electron:build": "electron-builder",
        release:
          "npm run react:build && npm run electron-builder --publish=always",
        build: "npm run react:build && npm run electron:build"
      }
    };

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);

    /**
     * Copy all other files
     */
    this.fs.copy(this.templatePath(".*"), this.destinationRoot());
  }

  install() {
    this.npmInstall();
  }
};

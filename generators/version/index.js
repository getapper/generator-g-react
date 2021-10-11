"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const pck = require("../../package.json");

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(
        `Hi! Welcome to ${chalk.blue(
          "GRYG, the Getapper React Yeoman Generator"
        )}\n${chalk.red("Current version is: " + pck.version)}`
      )
    );
  }
};

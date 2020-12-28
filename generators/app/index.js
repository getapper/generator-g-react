"use strict";
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  install() {
    this.spawnCommand("npx", [
      "create-react-app",
      ".",
      "--template",
      "typescript"
    ]);
  }
};

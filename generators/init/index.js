"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(
        `This command will install ${chalk.red(
          "Redux, Sagas, Persist and React-Router"
        )}!`
      )
    );
  }

  writing() {
    const pkgJson = {
      devDependencies: {
        "@types/react-redux": "7.1.9",
        "@types/react-router-dom": "^5.1.5",
        "env-cmd": "10.1.0",
        husky: "4.2.5",
        "lint-staged": "10.2.11"
      },
      dependencies: {
        "@reduxjs/toolkit": "1.4.0",
        axios: "0.19.2",
        "connected-react-router": "6.8.0",
        history: "4.10.1",
        "react-redux": "7.2.0",
        "react-router-dom": "5.2.0",
        "redux-persist": "6.0.0",
        "redux-saga": "1.1.3"
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

    const tsConfigJson = {
      compilerOptions: {
        baseUrl: "src"
      }
    };

    // Extend or create tsconfig.json file in destination path
    this.fs.extendJSON(this.destinationPath("tsconfig.json"), tsConfigJson);

    this.fs.copy(this.templatePath("."), this.destinationPath("."));
  }

  install() {
    this.npmInstall();
  }
};

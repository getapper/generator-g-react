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
        )} This commands will install a new cognito slice, a UserPoolManager model, and other resources to allow the SPA to communicate with the AWS Cognito service!
        ${chalk.red(
          "\nDon't forget to:\n\n 1) Add the cognito slice to your slices/index file\n\n2) Execute the actions.appStartup() action for initial session checking and\n\n3) Fill your .env.* files with cognito pool and client ids."
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
      dependencies: {
        "amazon-cognito-identity-js": "4.5.10",
        "aws-amplify": "4.3.19"
      }
    };
    this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);

    /**
     * Copy all other files
     */
    this.fs.copy(this.templatePath("."), this.destinationPath("."));

    /**
     * /feedback/sagas/index.tsx
     */
    const content = `
export function* awsErrorFeedbackSaga() {
  yield takeEvery(actions.cognitoSetAwsError, function* (action) {
    yield put(
      actions.setFeedback({
        type: AlertTypes.Error,
        message: action.payload.message,
      }),
    );
  });
}

`;

    fs.appendFileSync(
      path.join(
        this.destinationRoot(),
        "src",
        "redux-store",
        "slices",
        "feedback",
        "feedback.sagas.ts"
      ),
      content
    );

    /**
     * /src/components/index.tsx export file
     */

    const content4 = `
export const clearSession = createAction("app/clearSession");
`;

    fs.appendFileSync(
      path.join(
        this.destinationRoot(),
        "src",
        "redux-store",
        "extra-actions",
        "life-cycle",
        "index.ts"
      ),
      content4
    );

    /**
     * /src/components/index.tsx export file
     */

    const content2 = `export * from "./UserPoolManager";\n`;

    fs.appendFileSync(
      path.join(this.destinationRoot(), "src", "models", "index.tsx"),
      content2
    );

    /**
     * .env.* files
     */

    const content3 = `REACT_APP_COGNITO_USER_POOL_ID=PASTE_HERE_YOUR_POOL_ID
REACT_APP_COGNITO_CLIENT_ID=PASTE_HERE_YOUR_CLIENT_ID
    `;

    fs.appendFileSync(
      path.join(this.destinationRoot(), ".env.development"),
      content3
    );
    fs.appendFileSync(
      path.join(this.destinationRoot(), ".env.staging"),
      content3
    );
    fs.appendFileSync(
      path.join(this.destinationRoot(), ".env.production"),
      content3
    );
  }

  install() {
    this.npmInstall();
  }
};

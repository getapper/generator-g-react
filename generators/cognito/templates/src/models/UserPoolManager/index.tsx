import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  ISignUpResult,
  CognitoUserSession,
  CognitoRefreshToken,
} from "amazon-cognito-identity-js";
import { promisify } from "util";

export interface CognitoSignUpResult extends ISignUpResult {}

export interface CognitoTokens {
  idToken: string;
  accessToken: string;
  refreshToken: string;
}

export default class UserPoolManager {
  clientId: string;
  authDomain: string;
  redirectUri: string;
  userPool: CognitoUserPool;
  attributesList: string[];
  region: string;
  pems: any;
  iss: string;

  constructor(
    userPoolId: string,
    clientId: string,
    attributesList: string[] = [],
    authDomain?: string,
    redirectUri?: string,
    region?: string,
    accessKeyId?,
    secretAccessKey?,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: userPoolId,
      ClientId: clientId,
    });
    this.clientId = clientId;
    this.authDomain = authDomain;
    this.redirectUri = redirectUri;
    this.attributesList = attributesList;
    this.region = region;
  }

  async signup(
    email: string,
    password: string,
    values?: any,
  ): Promise<CognitoSignUpResult> {
    const attributes: CognitoUserAttribute[] = this.attributesList.map(
      (a) =>
        new CognitoUserAttribute({
          Name: a,
          Value: values[a],
        }),
    );

    const signupPromise = promisify(this.userPool.signUp.bind(this.userPool));
    return signupPromise(email, password, attributes, null);
  }

  async login(email: string, password: string): Promise<CognitoUserSession> {
    const authenticationDetails: AuthenticationDetails = new AuthenticationDetails(
      {
        Username: email,
        Password: password,
      },
    );

    const cognitoUser: CognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool,
    });

    return await new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: resolve,
        onFailure: reject,
        newPasswordRequired: () => {
          cognitoUser.completeNewPasswordChallenge(password, [], {
            onSuccess: resolve,
            onFailure: reject,
          });
        },
        mfaRequired() {
          const e = new Error("MFA required to authenticate");
          e["code"] = "MFARequired";
          e["session"] = cognitoUser["Session"];
          reject(e);
          // resolve(cognitoUser);
        },
      });
    });
  }

  /*
  async getOAuth2TokensFromCode(code: string): Promise<CognitoTokens> {
    return new Promise((resolve, reject) => {
      request(
        {
          url: `https://${this.authDomain}/oauth2/token`,
          method: "POST",
          form: {
            grant_type: "authorization_code",
            code,
            client_id: this.clientId,
            redirect_uri: this.redirectUri,
          },
        },
        (error, response, body) => {
          if (error) {
            return reject(error);
          }
          if (response.statusCode !== 200) {
            return reject(
              new Error(
                "Getting oAuth2 tokens error: " +
                  JSON.stringify(response?.body),
              ),
            );
          }
          const jsonBody = JSON.parse(body);

          resolve({
            idToken: jsonBody.id_token,
            accessToken: jsonBody.access_token,
            refreshToken: jsonBody.refresh_token,
          });
        },
      );
    });
  }
  */

  async recoveryPassword(email: string) {
    const cognitoUser: CognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool,
    });

    return await new Promise((resolve, reject) => {
      cognitoUser.forgotPassword({
        onSuccess: resolve,
        onFailure: reject,
      });
    });
  }

  /*
  async resetPassword(
    email: string,
    verificationCode: string,
    newPassword: string,
  ) {
    const cognitoUser: CognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool,
    });

    return await new Promise((resolve, reject) => {
      cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess: resolve,
        onFailure: reject,
      });
    });
  }
  */

  async confirmAccount(email: string, code: string) {
    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, function (err, result) {
        if (err) {
          return reject(err.message || JSON.stringify(err));
        }
        resolve(result);
      });
    });
  }

  async refreshTokens(
    idToken: string,
    refreshToken: string,
    email: string,
  ): Promise<CognitoUserSession> {
    const cognitoUser: CognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool,
    });

    const cognitoRefreshToken = new CognitoRefreshToken({
      RefreshToken: refreshToken,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.refreshSession(
        cognitoRefreshToken,
        (err, session: CognitoUserSession) => {
          if (err) {
            return reject(err);
          }
          resolve(session);
        },
      );
    });
  }

  /*
  async verifyMFA(
    cognitoUserSession: CognitoUserSession,
    username: string,
    verificationCode: string,
  ): Promise<any> {
    return await new Promise((resolve, reject) => {
      const cognitoUser: CognitoUserCustom = new CognitoUser({
        Username: username,
        Pool: this.userPool,
      });
      cognitoUser.Session = cognitoUserSession;
      cognitoUser.sendMFACode(verificationCode, {
        onSuccess: resolve,
        onFailure: reject,
      });
    });
  }
  */

  /*
  async changePassword(
    email: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const cognitoUser: CognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool,
    });
    await new Promise((resolve, reject) => {
      this.userPool.getCurrentUser().getSession((err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
    return await new Promise((resolve, reject) => {
      this.userPool
        .getCurrentUser()
        .changePassword(oldPassword, newPassword, (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
    });
  }
  */
}

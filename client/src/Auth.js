import auth0 from 'auth0-js';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'kabiyesi.auth0.com',
      clientID: 'D1lahFIpV82Mum7TimXgG0WPxpP8suGo',
      redirectUri: 'http://localhost:3000/callback',
      audience: 'https://kabiyesi.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid email'
    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  getIdToken() {
    return this.idToken;
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    })
  }

  setSession(authResult) {
    this.idToken = authResult.idToken;
    // set the time that the id token will expire at
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
  }

  logout() {
    this.auth0.logout({
      returnTo: 'http://localhost:3000',
      clientID: 'D1lahFIpV82Mum7TimXgG0WPxpP8suGo',
    });
  }

  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err);
        this.setSession(authResult);
        resolve();
      });
    });
  }

  isAuthenticated() {
    // Check whether the current time is past the token's expiry time
    return new Date().getTime() < this.expiresAt;
  }
}

const auth = new Auth();

export default auth;
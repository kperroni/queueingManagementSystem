import { Injectable } from '@angular/core';

@Injectable()
export class AppSessionService {

  private tokenKey = "userToken";

  constructor() { }

  setSessionToken(userToken) {
    sessionStorage.setItem(this.tokenKey, JSON.stringify(userToken));
  }

  getSessionToken() {
    let storedToken = sessionStorage.getItem(this.tokenKey);
    let token = JSON.parse(storedToken);
    if (!storedToken) throw 'no token found';
    return token;
  }

  destroySessionToken() {
    sessionStorage.removeItem(this.tokenKey);
  }

}

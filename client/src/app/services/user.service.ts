import { Injectable } from '@angular/core';
import { User } from '../models/UserData';
import { default as decode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  decodeUser(token: string) {

    try{
      const decoded: any = decode(token)
      const expirationDate = decoded.exp * 1000;
      if (new Date().getTime()> expirationDate) {
        return null;
      }
      this.storeUser(decoded, token);
      console.log(decoded)
      return decoded;
    } catch (e) {
      console.log(e);
    }

  }

  private storeUser(decoded: User, token: string) {
    localStorage.setItem('userData', JSON.stringify({
      exp: decoded.exp,
      iat: decoded.iat,
      sub: decoded.sub,
      token: token
    }))
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { User,UserData,LoginData} from 'src/app/models/UserData';


@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  // baseUrl="https://cynical-straw.up.railway.app"
  baseUrl="http://localhost:8080"
  constructor(private http: HttpClient, private router: Router) {
    this.loggedInStatus.next(!!localStorage.getItem('userData'));
   }

  loadUser!: User;
  userChange = new BehaviorSubject<User|null>(null);
  
// registering the user with the backend 
  register(data: UserData) {
    const body = {
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName
    }
    this.http.post(`${this.baseUrl}/api/registerUser`, body).subscribe(response=>{
      console.log(response);
    })
  }
// logging with the user in the backend
  login(data: LoginData): Promise<any> {
    const body = {
      username: data.username,
      password: data.password
    }

    return lastValueFrom(this.http.post(`${this.baseUrl}/authenticate`, body))
  }

  private loggedInStatus = new BehaviorSubject<boolean>(false);


  getLoggedInStatus() {
    return this.loggedInStatus.asObservable();
  }

  setLoggedInStatus(status: boolean) {
    this.loggedInStatus.next(status);
  }

}

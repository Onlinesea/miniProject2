import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // baseUrl="https://cynical-straw.up.railway.app"
  baseUrl="http://localhost:8080"

  constructor(private http:HttpClient) { }

  private getHttpOptions() {
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const token = userData?.token;
    console.info(token)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return httpOptions;
  }
  sendEmail(data:any):Promise<any>{

    return lastValueFrom(this.http.post(`${this.baseUrl}/api/sendEmail`,data,this.getHttpOptions()))
  }
}

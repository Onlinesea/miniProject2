import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { user } from '../model';

@Injectable({
  providedIn: 'root'
})
export class JournalService {


  constructor(private http: HttpClient) {}

  // authenticateUser(currUser:user): {
  //   // return lastValueFrom(this.http.post('/api/register'))
  // }

  registerUser(currUser:user):Promise<any> {
    return lastValueFrom(this.http.post('/api/register', currUser ))
  }

  authenticateUser(currUser:user):Promise<any> {
    return lastValueFrom(this.http.post('/api/authenticate', currUser ))
  }

  retrieveJournalList(currUser:string):Promise<any>{
    return lastValueFrom(this.http.get(/journal))
  }
}

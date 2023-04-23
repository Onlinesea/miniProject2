import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { journal } from '../models/model';
// import { journal, user } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class JournalService {


  constructor(private http: HttpClient) {}
  baseUrl="https://cynical-straw.up.railway.app"
    // baseUrl="http://localhost:8080"

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
  retrieveJournalList(currUser:string):Promise<any>{
    const params = new HttpParams()
    .set("user", currUser)
    return lastValueFrom(
      this.http.get(`${this.baseUrl}/api/journal`, {
        params:params, 
        headers: this.getHttpOptions().headers}))
  }
  retrieveJournalListForAggrid(currUser:string):Observable<any>{
    const params = new HttpParams()
    .set("user", currUser)
    return (
      this.http.get(`${this.baseUrl}/api/journal`, {
        params:params, 
        headers: this.getHttpOptions().headers}))
  }
  saveJournalEntry(journalEntry:journal):Promise<any>{
    const httpOptions = this.getHttpOptions();
    console.log("saving journalEntry > " + journalEntry)
    return lastValueFrom(this.http.post(`${this.baseUrl}/api/saveEntry`,journalEntry, httpOptions))
  }
  
  getQuoteFromAPI():Promise<any>{
    return lastValueFrom(this.http.get(`${this.baseUrl}/api/QuoteApi`,
    {headers: this.getHttpOptions().headers}))
  }
  deleteEntry(date:string,user:string):Promise<any>{
    const params = new HttpParams()
    .set("user", user)
    .set("date", date)
    const httpOptions = this.getHttpOptions();
    // return lastValueFrom(this.http.put('/api/deleteEntry',params, httpOptions))
    return lastValueFrom(this.http.put(`${this.baseUrl}/api/deleteEntry?user=${encodeURIComponent(user)}&date=${encodeURIComponent(date)}`, null, httpOptions));
  }
  undoDelete(id:string){
    const httpOptions = this.getHttpOptions();
    console.log("Retriving deletedEntry > " + id)
    const params = new HttpParams()
    .set("id", id)
    return lastValueFrom(this.http.post(`${this.baseUrl}/api/undo`,id,httpOptions))

  }
  sendNotification(title: string, message: string, token: string):Promise<any>{
    const data = { title, message, token };
    return lastValueFrom(this.http.post(`${this.baseUrl}/api/sendNotification`,data,this.getHttpOptions()))
  }
  deleteAccount():Promise<any>{
    return lastValueFrom(this.http.delete(`${this.baseUrl}/api/account`,this.getHttpOptions()))

  }
}
  


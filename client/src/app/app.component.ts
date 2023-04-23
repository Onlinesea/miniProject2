import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from './environment';
import { AuthenticateService } from './services/authenticate.service';
import { JournalService } from './services/journal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loggedIn=false
  title = 'client';
  message:any = null;

  constructor(private router:Router,private authSvc: AuthenticateService,private journalSvc:JournalService) {}
  ngOnInit(): void {
    if(localStorage.getItem('userData')){
      this.loggedIn=true
    }

    this.authSvc.getLoggedInStatus().subscribe((status) => {
      this.loggedIn = status;
    });
    this.requestPermission();
    this.listen();
  }


  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, 
     { vapidKey: environment.firebase.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
           console.log("Hurraaa!!! we got the token.....");
           console.log(currentToken);
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message=payload;
    });
  }
  updateLoggedInStatus(): void {
    this.loggedIn = !!localStorage.getItem('userData');
  }
  sendNotification(){
    const data = {
      title: "Testing with firebase",
      message: "notification from angular",
      token:
        "cZ-g9yHyutVwDDkw8dmaUI:APA91bH7ZLHOG97Y3Vi-ZTI3iZCJCRRGei_6bVskJ6Qgxnxdp4BcKW7lCIexBN0xM4ioqtbi0OXfAKlDAwEjj6l47FfEqO8X1BdcvATj3V8E8x7-Z2sOLIerI6toFBWWIl-ia7e14V9e",
    };
    this.journalSvc.sendNotification(data.title, data.message, data.token).then(
      (response) => {
        console.log('Notification sent successfully', response);
      },
      (error) => {
        console.error('Error sending notification', error);
      }
    );
  }
  logout() {
    // Perform any necessary logout actions, such as invalidating tokens or redirecting to the login page
    this.authSvc.setLoggedInStatus(false); // Update the loggedInStatus
    // Remove specific item from local storage
    this.router.navigate([``])
    localStorage.removeItem('userData');
  
    // Or clear the entire local storage
    // localStorage.clear();
  }

}



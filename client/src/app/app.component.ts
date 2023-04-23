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
           localStorage.setItem("token",currentToken)
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
    const token = localStorage.getItem("token");
    if(token){
      const data = {
        title: "Testing with firebase",
        message: "notification from angular",
        token: token,
      };
    
    this.journalSvc.sendNotification(data.title, data.message, data.token).then(
      (response) => {
        console.log('Notification sent successfully', response);
      },
      (error) => {
        console.error('Error sending notification', error);
      }
    );
  }else {
    console.error('No token found in local storage');
  }

  }
  logout() {
    // Perform any necessary logout actions, such as invalidating tokens or redirecting to the login page
    this.authSvc.setLoggedInStatus(false); // Update the loggedInStatus
    // Remove specific item from local storage
    this.router.navigate([``])
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
  
    // Or clear the entire local storage
    // localStorage.clear();
  }

}



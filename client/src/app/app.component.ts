import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from './services/authenticate.service';
import { JournalService } from './services/journal.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loggedIn = false
  title = 'client';
  homePage=false
  // message: any = null;

  constructor(private router: Router, private authSvc: AuthenticateService, 
      private journalSvc: JournalService, private activatedRoute:ActivatedRoute,private location: Location) { }
      
  ngOnInit(): void {
    if (localStorage.getItem('userData')) {
      this.loggedIn = true
    }

    this.authSvc.getLoggedInStatus().subscribe((status) => {
      this.loggedIn = status;
    });
    // this.requestPermission();
    // this.listen();
  }

  // requestPermission() {
  //   const messaging = getMessaging();
  //   getToken(messaging,
  //     { vapidKey: environment.firebase.vapidKey }).then(
  //       (currentToken) => {
  //         if (currentToken) {
  //           console.log("Hurraaa!!! we got the token.....");
  //           console.log(currentToken);
  //           localStorage.setItem("token", currentToken)
  //         } else {
  //           console.log('No registration token available. Request permission to generate one.');
  //         }
  //       }).catch((err) => {
  //         console.log('An error occurred while retrieving token. ', err);
  //       });
  // }
  // listen() {
  //   const messaging = getMessaging();
  //   onMessage(messaging, (payload) => {
  //     console.log('Message received. ', payload);
  //     this.message = payload;
  //   });
  // }
  updateLoggedInStatus(): void {
    this.loggedIn = !!localStorage.getItem('userData');
  }
  // sendNotification() {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     const data = {
  //       title: "Testing with firebase",
  //       message: "notification from angular",
  //       token: token,
  //     };

  //     this.journalSvc.sendNotification(data.title, data.message, data.token).then(
  //       (response) => {
  //         console.log('Notification sent successfully', response);
  //       },
  //       (error) => {
  //         console.error('Error sending notification', error);
  //       }
  //     );
  //   } else {
  //     console.error('No token found in local storage');
  //   }

  // }
  isHomePage() {
    this.homePage= this.router.url === '/' || this.router.url === '/home';
    return this.homePage;
  }
  deleteAccount(){
    const currentUser = JSON.parse(localStorage.getItem('userData') || '{}');
    if(currentUser){
      const user = currentUser
      this.journalSvc.deleteAccount().then((respone)=>{
        console.log("Account deleted")
        alert("Account deleted")
      }).catch((error)=>{
        console.log(error)
        alert("Account not deleted")
      })
      this.logout()
    }else{
      console.log("Error : token not found in token")
    }
    
  }
  goBack(): void {
    this.location.back();
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



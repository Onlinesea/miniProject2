import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { environment } from 'src/app/environment';
import { User, UserData } from 'src/app/models/UserData';
import { JournalService } from 'src/app/services/journal.service';
// import { digimonAvatar } from 'src/app/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  currentUser!: User
  message: any = null;


  constructor(private activatedRoute:ActivatedRoute,
              private router:Router, private journalSvc:JournalService){}

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');

    if (userData) {
      this.currentUser = JSON.parse(userData) as User;
      console.log(this.currentUser);
    } else {
      // Handle the case when userData is null
      console.error('User data not found in local storage');
    }
    this.requestPermission();
    this.listen();
  
    console.log(localStorage.getItem('userData'));
  }
  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging,
      { vapidKey: environment.firebase.vapidKey }).then(
        (currentToken) => {
          if (currentToken) {
            console.log("Hurraaa!!! we got the token.....");
            console.log(currentToken);
            localStorage.setItem("token", currentToken)
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
      this.message = payload;
    });
  }
  sendNotification() {
    const token = localStorage.getItem("token");
    if (token) {
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
    } else {
      console.error('No token found in local storage');
    }

  }

  loadJournal(){
    this.router.navigate([`/journal`])
  }
  loadGame(){
    this.router.navigate([`/game`])
  }
  loadPayment(){
    this.router.navigate([`/payment`])
  }
  loadMap(){
    this.router.navigate([`/googleMap`])
  }
  loadAggrid(){
    this.router.navigate([`/aggrid`])
  }

}



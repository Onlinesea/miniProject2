import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User, UserData } from 'src/app/models/UserData';
// import { digimonAvatar } from 'src/app/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  currentUser!: User

  constructor(private activatedRoute:ActivatedRoute,
              private router:Router){}

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');

    if (userData) {
      this.currentUser = JSON.parse(userData) as User;
      console.log(this.currentUser);
    } else {
      // Handle the case when userData is null
      console.error('User data not found in local storage');
    }
  
    console.log(localStorage.getItem('userData'));
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



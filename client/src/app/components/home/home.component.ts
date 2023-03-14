import { Component, OnInit } from '@angular/core';
import { digimonAvatar } from 'src/app/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  userAvatar!: digimonAvatar;
  progress!: number

  constructor(){}

    ngOnInit(): void {
      this.userAvatar = { // create new digimonAvatar object and assign it to userAvatar
        name: 'Agumon',
        image: 'https://wikimon.net/images/b/b9/Agumon_vpet_vb.png',
        currentProgress: 21,
        growthState: 'Child',
        evolution: [3,7,13,20,28]
      };
      this.progress = 100 * (this.userAvatar.currentProgress / this.userAvatar.evolution[this.userAvatar.evolution.length-1]);
    }
  
  }



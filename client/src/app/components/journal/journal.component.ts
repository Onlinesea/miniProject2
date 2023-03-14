import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { journalList } from 'src/app/model';
import { JournalService } from 'src/app/services/journal.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {

  userJournalList!:journalList

  constructor(private journalSvc:JournalService,
              private router:Router){}

  ngOnInit(): void {
      this.journalSvc
  }

  
}

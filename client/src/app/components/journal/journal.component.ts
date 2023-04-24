import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { JournalService } from 'src/app/services/journal.service';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { journal, journalList } from 'src/app/models/model';


@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {

  userJournalList!: journalList;
  user!: string;
  newEntry = false;
  entryForm!: FormGroup
  quote!: string
  quoteAuthor!: string
  ifQuote = false
  deleteEntryKey!:string
  deleted=false

  constructor(private journalSvc: JournalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient) { }

  // Init the app and get the journal that is related to the user 
  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('userData') || '{}');
    this.user = currentUser.sub; 
    console.info("this user " + this.user)
    this.getJournalList(this.user);
  }

  // getting journalList of the user 
  getJournalList(user: string) {
    this.journalSvc.retrieveJournalList(user).then(response => {
      this.userJournalList = response;
      console.log(response)
    }).catch(error => {
      console.log(error);
    })
  }

  setNewEntryToTrue() {
    this.newEntry = true;
    console.log("new Entry:" + this.newEntry)
    this.entryForm = this.createForm();
  }
  
  maxDate = new Date();
  private createForm(): FormGroup {
    return this.fb.group({
      message: this.fb.control<string>(this.quote, [Validators.required]),
      author: this.fb.control<string>(this.quoteAuthor,[Validators.required]),
      thoughts: this.fb.control<string>('', [Validators.required]),
      date: this.fb.control<Date>(new Date, [Validators.required]),
      feelings: this.fb.control<string>('', [Validators.required])
    })
  }
  saveJournalEntry() {
    if (this.entryForm.valid) {
      const journalEntry: journal = {
        message: this.entryForm.get('message')?.value,
        author: this.entryForm.get('author')?.value,
        thoughts: this.entryForm.get('thoughts')?.value,
        date: (this.entryForm.get('date')?.value).toISOString(),
        feelings: this.entryForm.get('feelings')?.value,
        user: this.user
      };
      console.log(journalEntry)
      this.journalSvc.saveJournalEntry(journalEntry).then(response => {
        console.log('Journal entry saved:', response);
        this.newEntry = false;
        this.entryForm.reset();
        this.getJournalList(this.user);
      }).catch(error => {
        console.error('Error saving journal entry:', error);
      });
    } else {
      console.error('Form is not valid');
    }
    this.newEntry = true
  }
  getQuote() {
    this.journalSvc.getQuoteFromAPI().then(response => {
      console.info(response);
      console.info(response.quoteMessage)
      this.quote = response.quoteMessage;
      this.quoteAuthor = response.quoteAuthor;
      this.ifQuote = true
    })
  }
  remove(entry:journal){

    // const date = new Date(dateString);
    // const isoDateString = date.toISOString();
    // console.log(isoDateString);
    // console.log(dateString);
    this.journalSvc.deleteEntry(entry).then(response =>{
      console.info(response);
      // alert(response.key)
      alert("Delete sucessfully, within 5min you can undo")
      this.deleteEntryKey=response.key
      this.deleted=true
      console.log("deleted entry key > " + response.key)
      this.getJournalList(this.user);
    }).catch(error => {
        console.error('Error deleting entry:', error);
    });     
  }

  undo(){
      this.journalSvc.undoDelete(this.deleteEntryKey).then(respone =>{
        console.info(respone)
        this.deleteEntryKey=""
        this.deleted=false
        this.getJournalList(this.user)
      }).catch(error => {
        console.error('Error undoing : ', error);
    });
  }
  
  // Each Column Definition results in one Column.





}




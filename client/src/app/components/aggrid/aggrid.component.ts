import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { map, Observable } from 'rxjs';
import { journalList } from 'src/app/models/model';
import { JournalService } from 'src/app/services/journal.service';

@Component({
  selector: 'app-aggrid',
  templateUrl: './aggrid.component.html',
  styleUrls: ['./aggrid.component.css']
})
export class AggridComponent implements OnInit{

  userJournalList!: journalList;
  user!: string;
  
  constructor(private journalSvc: JournalService) { }


  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('userData') || '{}');
    this.user = currentUser.sub; 
    console.info("this user " + this.user)
    this.getJournalList(this.user);
  }


  getJournalList(user: string) {
    this.journalSvc.retrieveJournalList(user).then(response => {
      this.userJournalList = response;
      console.log(response)
    }).catch(error => {
      console.log(error);
    })
  }

  public columnDefs: ColDef[] = [
    { field: 'date', resizable: true },
    { field: 'feelings', resizable: true },
    { field: 'thoughts', resizable: true }

  ];
  // public columnDefs: ColDef[] = [
  //   { field: 'make'},
  //   { field: 'model'},
  //   { field: 'price' }
  // ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  // Data that gets displayed in the grid
  public rowData$!: Observable<any[]>;

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  // Example load data from server
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.journalSvc.retrieveJournalListForAggrid(this.user).pipe(
        map(data => {

          console.log(data.journalList);
          return data.journalList;
        })
      );
      // this.getJournalList(this.user)
    return this.userJournalList;
  }
  // onGridReady(params: GridReadyEvent) {
  //   this.rowData$ = this.http
  //     .get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
  // }
  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/model';
import { GameService } from 'src/app/services/game.service';
import { JournalService } from 'src/app/services/journal.service';
import { JournalComponent } from '../journal/journal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  user!: user; 
  loginForm!:FormGroup;
  signUp= false;


  constructor(public fb:FormBuilder, private router:Router, private journalSvc:JournalService){}

  ngOnInit(): void {
      this.loginForm =this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>('', [ Validators.required] ),
      password: this.fb.control<string>('',[Validators.required])
    })
  }

  authenticate(){
    const user: user = this.loginForm.value;
    this.journalSvc.authenticateUser(user).then(response =>{
      console.info(response);
      if(response){
        this.router.navigate(['/home'])
      }
    }).catch(error=>{
      console.log(error)
    })
  }

}

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/model';
import { JournalService } from 'src/app/services/journal.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  user!: user; 
  signUpForm!:FormGroup;


  constructor(public fb:FormBuilder, private router:Router, private journalSvc:JournalService){}

  ngOnInit(): void {
      this.signUpForm =this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      username: this.fb.control<string>('', [ Validators.required] ),
      password: this.fb.control<string>('',[Validators.required])
    })
  }

  register(){
    const user: user = this.signUpForm.value;
    this.journalSvc.registerUser(user).then(response =>{
      console.info(response);
    }).catch(error=>{
      console.log(error)
    })
  }
}

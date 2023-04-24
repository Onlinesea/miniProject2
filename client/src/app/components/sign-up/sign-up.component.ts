import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { JournalService } from 'src/app/services/journal.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  signUpForm!:FormGroup;


  constructor(public fb:FormBuilder, private router:Router, 
    private journalSvc:JournalService,private authSvc:AuthenticateService){}

  ngOnInit(): void {
      this.signUpForm =this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      username: this.fb.control<string>('', [ Validators.required] ),
      password: this.fb.control<string>('',[Validators.required]),
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required])
    })
  }

// Sign up then navigate to the login page 
  registerUser() {
    const formData = this.signUpForm.value;
    this.authSvc.register(formData)
    this.router.navigate(["/login"])
  }
}

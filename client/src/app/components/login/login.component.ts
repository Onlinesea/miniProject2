import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { JournalService } from 'src/app/services/journal.service';
import { UserService } from 'src/app/services/user.service';
import { JournalComponent } from '../journal/journal.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  // user!: user; 
  loginForm!:FormGroup;
  signUp= false;
  // result!:userIsValid
  gUser:any
  loggedIn:any
  

  constructor(public fb:FormBuilder, private router:Router, private journalSvc:JournalService,
    private authService: SocialAuthService, private authSvc: AuthenticateService,private userSvc: UserService){}

  ngOnInit(): void {
      this.loginForm =this.createForm();

      this.authService.authState.subscribe((gUser) => {
        this.gUser = gUser;
        this.loggedIn = (gUser != null);
        console.log(this.gUser)
      });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      username: this.fb.control<string>('', [ Validators.required] ),
      password: this.fb.control<string>('',[Validators.required])
    })
  }
  loginUser() {
    console.log(this.loginForm.value)
    const formData = this.loginForm.value;
    this.authSvc.login(formData).then(response=>{

      const token = response.jwtToken;      
      this.userSvc.decodeUser(token);
      this.authSvc.setLoggedInStatus(true);
      this.router.navigate(['/home']);
    }).catch(error => {
      console.log(error)
      alert("wrong username or password")
    })

  }

}

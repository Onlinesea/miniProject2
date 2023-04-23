import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocialLoginModule, SocialAuthServiceConfig, SocialAuthService } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { AgGridModule } from 'ag-grid-angular';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { JournalComponent } from './components/journal/journal.component';
import { GameComponent } from './components/game/game.component';
import { MaterialModule } from './material.modules';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AggridComponent } from './components/aggrid/aggrid.component'
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from './environment';
import { initializeApp } from "firebase/app";
import { PaypalComponent } from './components/paypal/paypal.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { AuthGuard } from './auth.guard';
initializeApp(environment.firebase);

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },

  { 
    path: 'home',
    component: HomeComponent, 
    canActivate: [AuthGuard]
  },
  { 
    path: 'journal', 
    component: JournalComponent,
    canActivate: [AuthGuard]

  },
  { 
    path: 'game', 
    component: GameComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'aggrid', 
    component: AggridComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'payment', 
    component: PaypalComponent 
  },
  { 
    path: 'googleMap', 
    component: GoogleMapComponent 
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    JournalComponent,
    GameComponent,
    SignUpComponent,
    AggridComponent,
    PaypalComponent,
    GoogleMapComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    SocialLoginModule,
    AgGridModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    GoogleMapsModule
  ],
  providers: [
    // {
    // provide: SocialLoginModule,
    //         useFactory: ()=>{
    //             if(!SocialAuthService.staticSocialLogin) {
    //                 YourAthService.staticSocialLogin = new SocialLoginModule(null);
    //             }
    //             return YourAthService.staticSocialLogin;
    //         }    
    // },
    {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '29071411842-mtm1a6efdtrrkqq8f92aivgts7pc78fe.apps.googleusercontent.com'
          )
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }

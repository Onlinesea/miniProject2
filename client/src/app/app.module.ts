import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { JournalComponent } from './components/journal/journal.component';
import { GameComponent } from './components/game/game.component';
import { MaterialModule } from './material.modules';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'home/:user',component: HomeComponent },
  { path: 'journal/:user', component: JournalComponent },
  { path: 'game/:user', component: GameComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    JournalComponent,
    GameComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { BookingModalComponent } from './modal/bookingmodal.component';

const myFirebaseConfig = {
  apiKey: "AIzaSyAtnHhin0OCBO5Ow3IV43B-nAH7sAyE-CE",
  authDomain: "fir-forms-c962f.firebaseapp.com",
  databaseURL: "https://fir-forms-c962f.firebaseio.com",
  storageBucket: "fir-forms-c962f.appspot.com",
  messagingSenderId: "281583245259"
};
const myFirebaseAuthConfig = {
  provider: AuthProviders.Custom,
  method: AuthMethods.Redirect
};

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(myFirebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

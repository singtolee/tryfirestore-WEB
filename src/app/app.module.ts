import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { routes } from './routes'
import { AuthService} from './auth.service';
import { UploadimgService } from './uploadimg.service';

import { AppComponent } from './app.component';
import { LocationComponent } from './location/location.component';
import { ConsoleComponent } from './console/console.component';
import { UploadComponent } from './upload/upload.component';
import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { FileDropDirective } from './file-drop.directive';

export const firebaseConfig = {
  apiKey: "AIzaSyBWQpUcKhhU5uWREkAuXCXtQU78nHRU50w",
  authDomain: "singtostore-77f01.firebaseapp.com",
  databaseURL: "https://singtostore-77f01.firebaseio.com",
  projectId: "singtostore-77f01",
  storageBucket: "singtostore-77f01.appspot.com",
  messagingSenderId: "863424423308"
};

@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    ConsoleComponent,
    UploadComponent,
    LoginComponent,
    CategoriesComponent,
    FileDropDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routes,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [AuthService, UploadimgService],
  bootstrap: [AppComponent]
})
export class AppModule { }

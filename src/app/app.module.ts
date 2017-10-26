import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { routes } from './routes'
import { AuthService} from './auth.service';

import { AppComponent } from './app.component';
import { LocationComponent } from './location/location.component';
import { ConsoleComponent } from './console/console.component';
import { UploadComponent } from './upload/upload.component';
import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';

export const firebaseConfig = {
  apiKey: "AIzaSyCOL_GgaWIYbQAdSvZzF0RH9w8nnQRG_jU",
  authDomain: "aomai-f24a2.firebaseapp.com",
  databaseURL: "https://aomai-f24a2.firebaseio.com",
  projectId: "aomai-f24a2",
  storageBucket: "aomai-f24a2.appspot.com",
  messagingSenderId: "1050288730700"
};

@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    ConsoleComponent,
    UploadComponent,
    LoginComponent,
    CategoriesComponent
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
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

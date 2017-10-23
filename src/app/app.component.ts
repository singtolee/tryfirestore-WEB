import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
//import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
//import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogin:boolean;

  constructor(private afAuth:AngularFireAuth,private router:Router){
    this.afAuth.authState.subscribe(
      auth=>{
        if(auth){
          this.router.navigate(['/console']);
          this.isLogin = true;
        }
      }
    );
  }

  logout(){
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
    this.isLogin =false;
  }


}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Location {
  name:string;
}

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  newItem:string='';

  locationCol:AngularFirestoreCollection<Location>;
  items:Observable<any[]>;

  constructor(private db:AngularFirestore) { }

  ngOnInit() {
    this.locationCol = this.db.collection('FREEDELIVERYLOCATIONS');
    this.items = this.locationCol.snapshotChanges()
    .map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Location;
        const id = a.payload.doc.id;
        return {id,data};
      })}
    )
  }

  addNewItem(){
    this.db.collection('FREEDELIVERYLOCATIONS').add({'name':this.newItem});
    this.newItem = '';
  }

  removeAddress(id:string){
    this.db.collection('FREEDELIVERYLOCATIONS').doc(id).delete();
    //console.log(id);
  }

}

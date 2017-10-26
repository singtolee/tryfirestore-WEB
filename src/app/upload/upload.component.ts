import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Product } from '../product';
import { Xproduct } from '../xproduct';
import { Theng } from '../theng';


interface Category {
  name:Theng;
  id:string;
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  categoriesCol:AngularFirestoreCollection<Category>;
  cates:Observable<Category[]>;

  newPrd:Product;
  newXprd:Xproduct;

  constructor(private db:AngularFirestore) {
    this.newPrd = new Product();
    this.newXprd = new Xproduct();
  }

  ngOnInit() {
    this.categoriesCol = this.db.collection('CATEGORIES');
    this.cates = this.categoriesCol.valueChanges();
  }

}

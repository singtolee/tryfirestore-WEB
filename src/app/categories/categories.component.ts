import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Category {
  name:Name;
  id:string;
}

interface Name {
  TH:string;
  ENG:string;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  newCategoryENG:string='';
  newCategoryTH:string='';
  newID:string='';
  
  categoriesCol:AngularFirestoreCollection<Category>;
  cates:Observable<Category[]>;

  constructor(private db:AngularFirestore) { }

  ngOnInit() {
    this.categoriesCol = this.db.collection('CATEGORIES');
    this.cates = this.categoriesCol.valueChanges();
  }

  addNewCategory(){
    var ref = this.db.collection('CATEGORIES').doc(this.newID).set({name:{TH:this.newCategoryTH,ENG:this.newCategoryENG},id:this.newID});
    this.newCategoryENG = '';
    this.newCategoryTH = '';
    this.newID = '';
  }

}

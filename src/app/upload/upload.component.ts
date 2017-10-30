import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Product } from '../product';
import { Xproduct } from '../xproduct';
import { Sproduct } from '../sproduct';
import { Theng } from '../theng';

import { Imgupload } from '../Imgupload';
import { UploadimgService } from '../uploadimg.service';

import * as _ from "lodash";
import * as firebase from 'firebase';


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

  dropzoneActive: boolean = false;
  currentUpload: Imgupload;

  categoriesCol:AngularFirestoreCollection<Category>;
  cates:Observable<Category[]>;

  prdSubmitted:boolean = false;  //xproduct in editting state

  newPrd:Product;
  newXprd:Xproduct;
  newSprd:Sproduct;

  constructor(private db:AngularFirestore, private uploadService:UploadimgService) {
    this.newPrd = new Product();
    this.newXprd = new Xproduct();
    this.currentUpload = new Imgupload();
  }

  dropzoneState($event: boolean){
    this.dropzoneActive = $event;
  }

  handleDrop(fileList: FileList) {
    //this.currentUpload = new Imgupload(fileList[0],this.newPrd.category,this.newPrd.id);
    this.currentUpload.file = fileList[0];
    this.currentUpload.categoryID = this.newXprd.categoryID;
    //this.currentUpload.prdKey = this.newXprd.prdKey;
    this.uploadService.pushUpload(this.currentUpload);
  }

  ngOnInit() {
    this.categoriesCol = this.db.collection('CATEGORIES');
    this.cates = this.categoriesCol.valueChanges();
  }

  onSubmit(formData){
    this.prdSubmitted = true;
  }

  editXprd(){
    this.prdSubmitted = false;
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Xproduct } from '../xproduct';
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

  newXprd:Xproduct;

  //cs QTY ENG TH holder;
  qty:number=1;
  eng='';
  th='';

  //switch submit button
  prdok:boolean=false;

  constructor(private db:AngularFirestore, private uploadService:UploadimgService) {
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
    //generate a auto produck key first, save to firestore with this key; set this key to newXprd.prdkey, save short product
    //auto key
    var ref = this.db.createId();
    //populate this.newPrd
    var newSprd = {
      categoryID : this.newXprd.categoryID,
      description : {
        ENG : this.newXprd.description.ENG,
        TH : this.newXprd.description.TH
      },
      mainImgUrl : this.newXprd.mainImgUrl,
      name : {
        ENG : this.newXprd.name.ENG,
        TH : this.newXprd.name.TH
      },
      prdKey : ref,
      price : this.newXprd.price,
      status : this.newXprd.status
    };

    var fullPrd = {
      price : this.newXprd.price,
      isRefundable : this.newXprd.isRefundable,
      description : {
        ENG : this.newXprd.description.ENG,
        TH : this.newXprd.description.TH
      },
      name : {
        ENG : this.newXprd.name.ENG,
        TH : this.newXprd.name.TH
      },
      infoImgUrls : this.newXprd.infoImgUrls
    }
    
    //save partial full prd
    this.db.collection('FULLPRODUCT').doc(ref).set(fullPrd);

    //save array part of full prd
    for ( var i in this.newXprd.imgUrls) {
      this.db.collection('FULLPRODUCT').doc(ref).collection('CS').doc(i).set({
        url : this.newXprd.imgUrls[i],
        qty : this.newXprd.QTY[i],
        csENG : this.newXprd.csENG[i],
        csTH : this.newXprd.csTH[i]
      }); 
    }

    //save short version prd
    this.db.collection('SHORTPRODUCT').add(newSprd);
  }

  deleteImgByUrl(url:string){
    let imgRef = firebase.storage().refFromURL(url);
    imgRef.delete().then(()=>{
      this.currentUpload.url="";
    }).catch(error=>console.log(error));
  }

  save2array(){
    this.newXprd.QTY.push(this.qty);
    this.newXprd.csENG.push(this.eng);
    this.newXprd.csTH.push(this.th);
    this.newXprd.imgUrls.push(this.currentUpload.url);
    this.th='';
    this.eng='';
    //console.log(this.newXprd);
  }

  setMainImgUrl(url:string){
    this.newXprd.mainImgUrl = url;
  }

  add2InfoImgUrls(url:string){
    this.newXprd.infoImgUrls.push(url);
  }

  doneEditing(){
    this.prdok = true;
  }

}

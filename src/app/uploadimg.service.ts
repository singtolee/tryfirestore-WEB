import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import {Imgupload } from './imgupload';

@Injectable()
export class UploadimgService {

  constructor() { }

  pushUpload(img:Imgupload){
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`PRODUCTIMAGES/${img.categoryID}/${img.file.name}`).put(img.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      function(snapshot){
        //uploading
        img.progress = (uploadTask.snapshot.bytesTransferred/uploadTask.snapshot.totalBytes)*100;
      },
      function(error){
        //upload failed
        //console.log(error);
      },
      function(){
        //upload success
        img.url = uploadTask.snapshot.downloadURL;
        img.name = img.file.name;
      }
    );
  }

}

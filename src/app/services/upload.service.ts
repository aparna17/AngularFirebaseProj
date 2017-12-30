import { Injectable } from '@angular/core';
import { AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
//import { GalleryImage } from '../models/galleryImage.model';
import {} from 'angularfire2';
import {  AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Upload } from '../models/upload.model';
import { User } from '../models/user.model';
import * as  firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';
import { AngularFireAuth } from 'angularfire2/auth';

 @Injectable()
export class UploadService {

  // private basePath = '/uploads';
  // private uploads: FirebaseListObservable<GalleryImage[]>;

private basePath:string = '/uploads';
  uploads: AngularFireList<Upload[]>;
  private user: Observable<firebase.User>;
   uid: string;

  constructor(private afAuth: AngularFireAuth,private ngFire: AngularFireModule, private db: AngularFireDatabase) { 
     this.user = afAuth.authState;
     this.uid = afAuth.auth.getUid();
  }

  uploadFile(upload: Upload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${this.uid}/${upload.file.name}`)
      .put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      // three observers
      // 1.) state_changed observer
      (snapshot) => {
        // upload in progress
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        console.log(upload.progress);
      },
      // 2.) error observer
      (error) => {
        // upload failed
        console.log(error);
      },
      // 3.) success observer
      (): any => {
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.saveFileData(upload);
      }
    );
  }
  private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
    console.log('File saved!: ' + upload.url);
  }
 }
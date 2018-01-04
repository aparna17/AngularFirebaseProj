import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import { GalleryImage } from '../models/galleryImage.model';
import * as firebase from 'firebase';
import { saveAs } from 'file-saver/FileSaver';
import {element} from "protractor";
import Blob = firebase.firestore.Blob;


@Injectable()
export class ImageService {
  private uid: string;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { 
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.uid = auth.uid;
      }
    });
  }

  getImages(): Observable<GalleryImage[]> {
    return this.db.list('uploads').valueChanges();
  }

  getImage(imagelist) {
    let storage = firebase.storage();

    imagelist.map(image =>
        storage.refFromURL(image.url).getDownloadURL().then(function(url) {
          let xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = function(event) {
            let blob = xhr.response;
            saveAs(blob, image.name);
          };
          xhr.open('GET', url,true);
          xhr.send();
        }));

  }
}
import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { GalleryImage } from '../models/galleryImage.model';
import { Observable } from 'rxjs/Observable';
//import { saveAs } from 'file-saver/FileSaver';
//import { Http, Headers } from '@angular/http';
//import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  images: Observable<GalleryImage[]>;

  constructor( private imageService: ImageService) { }

 getFiles() {
   this.images = this.imageService.getImages();
  }

// saveFile(){
// const headers = new Headers();
//     headers.append('Accept', 'text/plain');
//     this.http.get('/api/files', { headers: headers })
//       .toPromise()
//       .then(response => this.saveToFileSystem(response));
// }

//   private saveToFileSystem(response) {
//     const contentDispositionHeader: string = response.headers.get('Content-Disposition');
//     const parts: string[] = contentDispositionHeader.split(';');
//     const filename = parts[1].split('=')[1];
//     const blob = new Blob([response._body], { type: 'text/plain' });
//     saveAs(blob, filename);
//   }
}
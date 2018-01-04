import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { GalleryImage } from '../models/galleryImage.model';
import { Observable } from 'rxjs/Observable';
import { saveAs } from 'file-saver/FileSaver';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
    images: Observable<GalleryImage[]>;
    selectedImages: Array<{name: string, progress: number, url: string}> = [];

    constructor(private imageService: ImageService) {
    }

    getFiles() {
        this.images = this.imageService.getImages();


    }

    selectedImage(img) {
        this.selectedImages.push(img);

    }

    download()
    {
        this.imageService.getImage(this.selectedImages);

    }

    /*saveFile() {
     this.imageService.getImages().subscribe(
     (res) =>res.map(r=> this.saveToFileSystem(r));
     }


     saveToFileSystem(response: any) {
     const contentDispositionHeader: string = response.headers.get('Content-Disposition');
     const parts: string[] = contentDispositionHeader.split(';');
     const filename = parts[1].split('=')[1];
     const blob = new Blob([response._body], {type: 'text/plain'});
     saveAs(blob, filename);
     }  */
}

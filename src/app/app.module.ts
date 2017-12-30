import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment} from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
//import {  AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';


import { AuthenticationService } from './services/authentication.service';
import { ImageService } from './services/image.service';
import { UploadService } from './services/upload.service';
//import { ProfileService } from './services/profile.service';
import { AuthenticationGuard } from './services/authenticationGuard.service';

import { appRoutes } from '../routes';
import { NavbarComponent } from './navbar/navbar.component';
import { GalleryComponent } from './gallery/gallery.component';
import { UploadComponent } from './upload/upload.component';
//import { DownloadComponent } from './download/download.component';
//import { ProfileComponent } from './profile/profile.component';

//import { saveAs } from 'file-saver/FileSaver';
//import { Http, Headers } from '@angular/http';


@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,   
    GalleryComponent,  
    UploadComponent, 
    //DownloadComponent, 
    //ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    //saveAs,
    //Http, Headers 
    
  ],
  providers: [
    AuthenticationService,
    ImageService,
    AuthenticationGuard,
    UploadService,
    //ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

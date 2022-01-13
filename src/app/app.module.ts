import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { LoginComponent } from './login/login.component';
import { MyAlbumsComponent } from './my-albums/my-albums.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { RecentAlbumsComponent } from './recent-albums/recent-albums.component';
import { UploadPictureComponent } from './upload-picture/upload-picture.component';
import { FormsModule } from '@angular/forms';
import { environment } from "src/environments/environment";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'; 
import { AngularFireModule } from '@angular/fire/compat';
import { UserService } from './user.service';
import { getAuth } from 'firebase/auth';
import { provideAuth } from '@angular/fire/auth';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    AlbumDetailsComponent,
    CreateAlbumComponent,
    LoginComponent,
    MyAlbumsComponent,
    PhotoDetailsComponent,
    RecentAlbumsComponent,
    UploadPictureComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    provideAuth(() => getAuth()),
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

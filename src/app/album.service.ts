import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Album } from './Album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient, private router: Router) { }

  getAllAlbums(){
    var headers = this.getHeader();
    console.log("Calling getAllAlbums method with header",headers);
    return this.http.get(environment.API_BASE_URL+"albumsDb", {headers});
  }

  getPhotos(albumId:string){
    var headers = this.getHeader();
    return this.http.get(environment.API_BASE_URL+"albumsDb/"+albumId+"/photos", {headers});
  }

  getHeader(){
    var headers = {
      'idToken': localStorage.getItem('userIdToken')??""
    };
    return headers;
  }

  // saveAlbum(albumTitle: string, fileId: string){
  //   var album: Album = {
  //     coverPhotoUrl: environment.API_BASE_URL + "files/show/" + fileId,
  //     createdBy: "",
  //     dateCreated: "",
  //     id: "",
  //     name: albumTitle
  //   };
  //   var headers = this.getHeader();
  //   this.http.post(environment.API_BASE_URL + "albums", album, {headers})
  //   .subscribe(
  //     album => {
  //       console.log("Album Created",album);
  //     }
  //   )
  // }

  saveAlbum(userName: string, albumTitle: string, fileId: string) {
    console.log("Album from service");
    var album: Album = {
        id: "",
        name: albumTitle,
        coverPhotoUrl: environment.API_BASE_URL+"files/show/" + fileId,
        createdBy: userName,
        dateCreated: ""
    };
    console.log("Album to save:", album);

    var headers = this.getHeader();
    this.http.post(environment.API_BASE_URL+"albumsDb", album, { headers })
        .subscribe(albums => {
            console.log("Album created", albums);
        });

    }

    getAlbum(albumId:string|null|undefined){

      var headers = this.getHeader();
      
      console.log("Calling getalbum method with header",headers);
  
      
        return this.http.get(environment.API_BASE_URL+"albums/find?id="+albumId,{headers});
  
    }
  
  
    updateAlbumCover(album:Album){
  
  
      var headers = this.getHeader();
  
        return this.http.put(environment.API_BASE_URL+ "albums",album,{headers})
      .subscribe(albumData=> {
  
        console.log("album saved:",albumData);
        var album :Album = <Album>(albumData);
        var albumId = album.id;
  
        this.router.navigate(['albums/',albumId])
  
  
        
  
      })
  
    }

}

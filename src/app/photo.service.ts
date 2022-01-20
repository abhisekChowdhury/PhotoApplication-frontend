import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comment } from './Comment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  saveComment(photoId: string, newComment: string){
    var comment: Comment ={
      createdBy: '',
      message: newComment,
      dateCreated: '',
      id: '',
      photoId: photoId
    }

    var headers = this.getHeader();
    console.log("Comment: "+comment.toString());
    return this.http.post(environment.API_BASE_URL + "photos/comments",comment,{headers})
  }

  makeProfilePhoto(photoUrl: string){
    var headers = this.getHeader();
    var params = new HttpParams().set('profilePicUrl',photoUrl);
    return this.http.put(environment.API_BASE_URL+"users/me/profilePhoto", params, {headers});

  }

  getPhoto(photoId: string){
    var headers = this.getHeader();
    return this.http.get(environment.API_BASE_URL+"photos/"+photoId, {headers});
  }

  getComments(photoId: string){
    var headers = this.getHeader();
    return this.http.get(environment.API_BASE_URL+"photos/"+photoId+"/comments", {headers});
  }

  getHeader(){
    var headers = {
      'idToken': localStorage.getItem('userIdToken')??""
    };
    return headers;
  }
}

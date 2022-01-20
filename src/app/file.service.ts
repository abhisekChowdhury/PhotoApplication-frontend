import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File){

    var formData = new FormData();
    formData.append("file",file);

    return this.http.post(environment.API_BASE_URL + "files/upload", formData);
  }
}

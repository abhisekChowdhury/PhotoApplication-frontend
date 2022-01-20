import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumService } from '../album.service';
import { FileService } from '../file.service';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css']
})
export class CreateAlbumComponent implements OnInit {

  albumTitle!: string;
  userName!: string;

  constructor(private fileService: FileService, private albumService: AlbumService, private router: Router) { }

  ngOnInit(): void {
  }

  createAlbum(file: File){
    console.log("File:",file);

    this.fileService.uploadFile(file)
    .subscribe(
      fileResponse => {
        var fileId = Object(fileResponse)["id"];
        console.log("File data from service", Object(fileResponse)["id"]);
        this.saveAlbum(fileId);
      }
    )
  }

  // saveAlbum(fileId: string){
  //   this.albumService.saveAlbum(this.albumTitle, fileId);
  // }

  saveAlbum(fileId: string) {
    console.log("album1");
    this.albumService.saveAlbum(this.userName, this.albumTitle, fileId);
    this.router.navigate(['albums/recent']);
}

}

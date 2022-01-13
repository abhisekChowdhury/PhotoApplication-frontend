import { Component, OnInit } from '@angular/core';
import { Album } from '../Album';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-recent-albums',
  templateUrl: './recent-albums.component.html',
  styleUrls: ['./recent-albums.component.css']
})
export class RecentAlbumsComponent implements OnInit {

  albums!: Album[];

  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    console.log("Calling albumService from component");
    this.albumService.getAllAlbums().subscribe(
      response => {
        this.albums = <Album[]>response;
        console.log("Got all album response", this.albums);
      }
    );
  }

}

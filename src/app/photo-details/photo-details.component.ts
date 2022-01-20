import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../Photo';
import { Comment } from '../Comment';
import { PhotoService } from '../photo.service';
import { AlbumService } from '../album.service';
import { Album } from '../Album';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  photoId!: string;
  photo!: Photo;
  allComments!: Comment[];

  newComment!: string;

  albums: Album[] |undefined
  album: Album|undefined
  photos:Photo[]|undefined|null;
  albumId!: string;

  constructor(private route: ActivatedRoute, private photoService: PhotoService, private albumService: AlbumService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.photoId = params.get('photoId')||"";
      console.log('Got album Id',this.photoId);
      this.loadPhoto(this.photoId);
      this.loadComments(this.photoId);
    });
  }

  loadPhoto(photoId: string){
    this.photoService.getPhoto(photoId)
    .subscribe(
      photo => {
        this.photo = <Photo>photo;
        console.log("Loaded photo details: ", this.photo);
      }
    )
  }

  loadComments(photoId: string){
    this.photoService.getComments(photoId)
    .subscribe(
      comments => {
        this.allComments = (<Comment[]>comments).reverse();
        console.log("Loaded comments: ",this.allComments);
      }
    )
  }

  loadCommentsReverse(){
    this.allComments.reverse();
    console.log("Reversed Comments: ", this.allComments);
  }

  makeProfilePhoto(){
    this.photoService.makeProfilePhoto(this.photo.photoUrl)
    .subscribe(
      response => {
        console.log("Profile photo updated", response);
      }
    )
  }

  makeCover(){
    this.albumService.getAlbum(this.albumId).subscribe(
      albums=>{
        console.log(this.albumId)
        this.albums = <Album[]>albums;
        if(this.albums.length!=0)
        {
          this.album = this.albums[0];
          this.album.coverPhotoUrl = this.photo?.photoUrl;
          this.albumService.updateAlbumCover(this.album);
        }
      }
    )
  }

  saveComment(){
    this.photoService.saveComment(this.photoId, this.newComment)
    .subscribe(
      response => {
        console.log("Comment Posted!");
        this.loadComments(this.photoId);
        this.newComment="";
      }
    )
  }

}

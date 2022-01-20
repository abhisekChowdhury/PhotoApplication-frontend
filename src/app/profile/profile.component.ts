import { Component, OnInit } from '@angular/core';
import { User } from '@auth0/auth0-angular';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  title = 'Profile Page Title';

  imageUrl = 'https://i.pinimg.com/736x/a3/9c/1e/a39c1e2636f0f319bc4a46d06ebed079.jpg'

  viewCount = 0;

  name = "Abhisek";

  list = ["Item 1","Item 2","Item 3"];

  user!: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUserProfile().subscribe(
      userProfile =>{
        this.user = <User>userProfile;
        console.log("Got user profile", this.user);
      }
    )
  }

  incrementCount(){
    this.viewCount++
  }

  resetCount(){
    this.viewCount = 0;
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormVisible = true;

  email!: string;
  password!: string;
  name!:string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  makeLogInFormVisible(){
    this.loginFormVisible = true;
  }

  makeSignUpFormVisible(){
    this.loginFormVisible =  false;
  }

  login(){
    console.log("User tried to login!");
    this.userService.SignIn(this.email,this.password);
    this.email="";
    this.password="";
  }

  signup(){
    console.log("User tried to signup!");
    console.log("Name in component",this.name);
    this.userService.SignUp(this.email,this.password, this.name);
    this.email="";
    this.password="";
  }

  signOut(){
    this.userService.SignOut();
  }
}

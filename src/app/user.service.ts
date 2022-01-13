import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import * as firebase from 'firebase/compat';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate{

  userData: Observable<any>;
  defaultProfilePhoto: string = "https://i.pinimg.com/736x/a3/9c/1e/a39c1e2636f0f319bc4a46d06ebed079.jpg";
  //userIdToken!: string;
 
  constructor(private angularFireAuth: AngularFireAuth, private router: Router, private http: HttpClient) {
  this.userData = angularFireAuth.authState;

  //this.userIdToken = localStorage.getItem('userIdToken')||'';
  console.log("User Id Token at the construction of the Service", localStorage.getItem('userIdToken'))

  this.userData.subscribe(
    userInfo => {
      console.log("User Info is available", userInfo)
      this.saveIdToken(userInfo());
    }
  );
  }

  canActivate(): boolean{
    if(this.angularFireAuth.currentUser!=null){
      return true;
    }
    return false;
  }

  // storeIdToken(idToken: Promise<string>){
  //   idToken.then(
  //     idTokenValue => {
  //       localStorage.setItem('userIdToken', idTokenValue);
  //       //this.userIdToken = localStorage.getItem('userIdToken')||'';
  //       console.log("ID Token Value", localStorage.getItem('userIdToken'));
  //     }
  //   );
  // }

  saveIdToken(firebaseUser : any){
    firebaseUser.getIdToken().then(
      (      idTokenValue: string) => {
        localStorage.setItem('userIdToken', idTokenValue);
        //this.userIdToken = localStorage.getItem('userIdToken')||'';
        console.log("ID Token Value", localStorage.getItem('userIdToken'));
      }
    );
  }

  getHeaders(){
    var headers = {
      'idToken': localStorage.getItem('userIdToken')??""
    };

    return headers;
  }
  
  /* Sign up */
  SignUp(email: string, password: string, name: string) {
  this.angularFireAuth
  .createUserWithEmailAndPassword(email, password)
  .then(res => {
  console.log('You are Successfully signed up!', res);
  console.log("Name in signup = ", name);
  this.saveIdToken(res.user);
  this.registerUser(email,name);
  })
  .catch(error => {
  console.log('Something is wrong:', error.message);
  });
  }

  registerUser(email: string, name: string){
    var user: User = {
      address!:	"NA",
      age!:	20,
      email!:	email,
      id!:	"",
      name!:	name,
      profilePicUrl!:	this.defaultProfilePhoto,
    }
    var headers = this.getHeaders();
    this.http.post(environment.API_BASE_URL + "users", user, {headers})
      .subscribe(response=>{
        console.log('You have successfully registered!');
        console.log("Name in registration = ",name);
        this.router.navigate(['albums/recent'])
        .catch(error => {
          console.log('Something is wrong:', error.message);
          });
      })
  }
  
  /* Sign in */
  SignIn(email: string, password: string) {
  this.angularFireAuth
  .signInWithEmailAndPassword(email, password)
  .then(res => {
  console.log("You're in!");
  this.saveIdToken(res.user);
  this.router.navigate(['albums/recent']);
  })
  .catch(err => {
  console.log('Something went wrong:',err.message);
  });
  }
  
  /* Sign out */
  SignOut() {
  localStorage.clear
  this.angularFireAuth
  .signOut().then(res => {
    console.log("You're logged out!");
    this.router.navigate(['login']);
    });
  }
  
  getCurrentUserProfile(){
    var headers = this.getHeaders();
    console.log("Calling getAllAlbums method with header", headers);
    return this.http.get(environment.API_BASE_URL + "users", {headers})
  }
 
}

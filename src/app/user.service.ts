import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate{
  
  userData: Observable<any>; //Could be a problem because of this.
  defaultProfilePhoto: string = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  //userIdToken!:string;

  constructor(private angularFireAuth: AngularFireAuth, 
    private router: Router, 
    private http: HttpClient,
    private messageService: MessageService) {
    this.userData = angularFireAuth.authState;

    //this.userIdToken = localStorage.getItem('userIdToken')||'';
    console.log("User Id Token at the construction of the Service", localStorage.getItem('userIdToken'));

    this.userData.subscribe(
      userInfo => {
        console.log("User Info is available", userInfo)
        this.saveIdToken(userInfo);
      }
    );
  }
  
  //Async and await solved the problem. Otherwise only canActivate would have returned true always.
  async canActivate(): Promise<boolean>{
    if(await this.angularFireAuth.currentUser!=null){
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

  // storeIdToken(idToken: Promise<string>){
  //   idToken.then(
  //     idTokenValue => {
  //       localStorage.setItem('userIdToken',idTokenValue);
  //       //this.userIdToken = localStorage.getItem('userIdToken')||'';
  //       console.log("Id Token Value: ",localStorage.getItem('userIdToken')); 
  //     }
  //   );
  // }

  saveIdToken(firebaseUser: any){
    firebaseUser.getIdToken().then(
      (idTokenValue: string) => {
        localStorage.setItem('userIdToken',idTokenValue);
        console.log("Id Token Value: ",localStorage.getItem('userIdToken')); 
      }
    );
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
    this.messageService.newMessage(error.message);
    });
  }

  registerUser(email: string, name: string){

    var user: User = {
      emailAddress: email,
      id: '',
      name: name,
      profilePicUrl: this.defaultProfilePhoto
    };

    var headers = this.getHeaders();
    this.http.post(environment.API_BASE_URL + "users/addNewUser", user)
    .subscribe(response => {
      console.log('You have successfully registered!');
      this.router.navigate(['albums/recent']);
    });
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
    this.messageService.newMessage(err.message);
    });
    }
    
    /* Sign out */
    SignOut() {
    localStorage.clear();
    this.angularFireAuth
    .signOut().then(res => {
      console.log("You're logged out!");
      this.router.navigate(['login']);
      });
    }

    getCurrentUserProfile(){
      var headers = this.getHeaders();
      console.log("Calling getAllAlbums method with header", headers);
      return this.http.get(environment.API_BASE_URL + "users/me", {headers})
    }

    getHeaders(){
      var headers = {
        'idToken': localStorage.getItem('userIdToken')??""
      };
  
      return headers;
    }
}

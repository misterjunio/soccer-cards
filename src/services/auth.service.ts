import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import firebase from 'firebase/app';
import { FirebaseService } from './firebase.service';

@Injectable()
export class AuthService {
  constructor(
    private firebaseService: FirebaseService
  ){}

  doRegister(value) {
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(
       (res) => {
         this.firebaseService.createUser(res.user.uid);
         resolve(res)
        },
       err => reject(err))
   })
  }

  doLogin(value) {
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser) {
        firebase.auth().signOut()
        .then(() => {
          this.firebaseService.unsubscribeOnLogOut();
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }

  getCurrentPlayer() {
    return firebase.auth().currentUser;
  }
}

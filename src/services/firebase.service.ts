import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';
import firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class FirebaseService {
  private snapshotChangesSubscription: any;

  constructor(
    public afs: AngularFirestore
  ) { }

  createUser(userId) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('users').doc(userId).set({
        name: '',
        image: 'assets/imgs/default_player.png'
      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  getCurrentPlayer(playerId) {
    return this.afs.collection('users').doc(playerId).valueChanges();
  }

  getFriends() {
    return new Promise<any>((resolve, reject) => {
      const currentUser = firebase.auth().currentUser;
      this.snapshotChangesSubscription = this.afs.collection('people').doc(currentUser.uid).collection('friends', ref => ref.orderBy('name')).snapshotChanges()
        .subscribe(snapshots => {
          resolve(snapshots);
        })
    });
  }

  unsubscribeOnLogOut() {
    this.snapshotChangesSubscription.unsubscribe();
  }

  updateFriend(playerKey, value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('friends').doc(playerKey).set(value)
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  deleteFriend(playerKey) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('friends').doc(playerKey).delete()
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  createFriend(value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('friends').add({
        name: value.name,
        status: value.status,
        image: value.image,
        skills: value.skills
      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux: any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  uploadImage(imageURI, randomId) {
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child(randomId);
      this.encodeImageUri(imageURI, function (image64) {
        imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            snapshot.ref.getDownloadURL()
              .then(res => resolve(res))
          }, err => {
            reject(err);
          })
      })
    })
  }
}

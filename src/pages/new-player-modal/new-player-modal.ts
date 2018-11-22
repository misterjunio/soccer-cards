import { Component } from '@angular/core';
import { ViewController, normalizeURL, ToastController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { ImagePicker } from '@ionic-native/image-picker';

@Component({
  selector: 'page-new-player-modal',
  templateUrl: 'new-player-modal.html'
})
export class NewPlayerModalPage {
  addPlayerForm: FormGroup;
  image: any;
  loading: any;

  constructor(
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private imagePicker: ImagePicker,
    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController
  ) {
    this.addPlayerForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
    
    this.loading = this.loadingCtrl.create();
  }

  ionViewWillLoad() {
    this.resetFields();
  }

  resetFields() {
    this.image = "./assets/imgs/default_player.png";
    this.addPlayerForm = this.formBuilder.group({
      name: new FormControl('', Validators.required)
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addPlayer(value) {
    console.log("Added player " + value.name);
    let data = {
      name: value.name,
      status: "To do",
      image: this.image
    }
    this.firebaseService.createFriend(data)
    .then(
      res => {
        this.resetFields();
        this.viewCtrl.dismiss();
      }
    )
  }

  openImagePicker() {
    this.imagePicker.hasReadPermission()
    .then((result) => {
      if(result == false) {
        // no callbacks required as this opens a popup which returns async
        this.imagePicker.requestReadPermission();
      }
      else if(result == true){
        this.imagePicker.getPictures({
          maximumImagesCount: 1
        }).then(
          (results) => {
            for (var i = 0; i < results.length; i++) {
              this.uploadImageToFirebase(results[i]);
            }
          }, (err) => console.log(err)
        );
      }
    }, (err) => {
      console.log(err);
    });
  }

  uploadImageToFirebase(image) {
    this.loading.present();
    image = normalizeURL(image);
    let randomId = Math.random().toString(36).substr(2, 5);

    //uploads img to firebase storage
    this.firebaseService.uploadImage(image, randomId)
    .then(photoURL => {
      this.image = photoURL;
      this.loading.dismiss();
      let toast = this.toastCtrl.create({
        message: 'Image was updated successfully',
        duration: 3000
      });
      toast.present();
      })
  }
}

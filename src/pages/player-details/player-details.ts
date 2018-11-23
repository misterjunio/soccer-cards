import { Component } from '@angular/core';
import { ViewController, normalizeURL, ToastController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { ImagePicker } from '@ionic-native/image-picker';

@Component({
  selector: 'page-player-details',
  templateUrl: 'player-details.html'
})

export class PlayerDetailsPage {
  updatePlayerForm: FormGroup;
  image: any;
  player: any;
  loading: any;
  mainSkillValues: Array<number>;

  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private imagePicker: ImagePicker,
    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewWillLoad() {
    this.getData()
  }

  getData() {
    this.player = this.navParams.get('data');
    this.image = this.player.image;
    this.mainSkillValues = [
      Math.round(this.player.skills.acceleration * 0.45 + this.player.skills.sprintSpeed * 0.55),
      Math.round(this.player.skills.shotPositioning * 0.5 + this.player.skills.shotPower * 0.5)
    ];
    this.updatePlayerForm = this.formBuilder.group({
      name: new FormControl(this.player.name, Validators.required)
    });
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }

  updatePlayer(value) {
    let data = {
      name: value.name,
      status: "To do",
      image: this.image
    }
    this.firebaseService.updateFriend(this.player.id,data)
    .then(
      res => {
        this.viewCtrl.dismiss();
      }
    )
  }

  deletePlayer() {
    let confirm = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to delete ' + this.player.name + '?',
      buttons: [
        {
          text: 'No',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: () => {
            this.firebaseService.deleteFriend(this.player.id)
            .then(
              res => this.viewCtrl.dismiss(),
              err => console.log(err)
            )
          }
        }
      ]
    });
    confirm.present();
  }

  openImagePicker() {
    this.imagePicker.hasReadPermission()
    .then((result) => {
      if(result == false){
        // no callbacks required as this opens a popup which returns async
        this.imagePicker.requestReadPermission();
      }
      else if(result == true) {
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
    console.log(randomId);

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
